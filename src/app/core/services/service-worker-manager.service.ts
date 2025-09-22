import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UpdateInfo {
  available: boolean;
  version?: string;
  currentVersion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerManagerService {
  private updateAvailableSubject = new BehaviorSubject<UpdateInfo>({ available: false });
  public updateAvailable$ = this.updateAvailableSubject.asObservable();
  
  private swRegistration: ServiceWorkerRegistration | null = null;
  private checkInterval: number | null = null;
  private isDev = false;

  constructor(private ngZone: NgZone) {
    this.isDev = !environment.production;
    this.initializeServiceWorker();
  }

  private async initializeServiceWorker(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    try {
      // Register service worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      // Listen for updates
      this.setupUpdateListeners();

      // Start periodic update checks
      this.startUpdateChecks();

      // Check for updates on focus
      this.setupFocusListeners();

    } catch (error) {
      // Silent fail for service worker registration
    }
  }

  private setupUpdateListeners(): void {
    if (!this.swRegistration) return;

    // Listen for service worker updates
    this.swRegistration.addEventListener('updatefound', () => {
      this.handleUpdateFound();
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event);
    });

    // Listen for controller change (new service worker activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      this.handleControllerChange();
    });
  }

  private handleUpdateFound(): void {
    if (!this.swRegistration?.waiting) return;

    // Notify about update availability
    this.ngZone.run(() => {
      this.updateAvailableSubject.next({ 
        available: true,
        version: 'new',
        currentVersion: 'current'
      });
    });

    // Auto-update in production, manual in development
    if (!this.isDev) {
      this.applyUpdate();
    }
  }

  private handleServiceWorkerMessage(event: MessageEvent): void {
    const { data } = event;
    
    switch (data.type) {
      case 'UPDATE_AVAILABLE':
        this.ngZone.run(() => {
          this.updateAvailableSubject.next({
            available: true,
            version: data.version,
            currentVersion: data.currentVersion
          });
        });
        
        // Auto-apply update in production
        if (!this.isDev) {
          this.applyUpdate();
        }
        break;
        
      case 'FORCE_RELOAD':
        this.ngZone.run(() => {
          window.location.reload();
        });
        break;
    }
  }

  private handleControllerChange(): void {
    // Service worker has been updated, reload the page
    this.ngZone.run(() => {
      window.location.reload();
    });
  }

  private startUpdateChecks(): void {
    // Different intervals for dev vs prod
    const interval = this.isDev ? 30 * 1000 : 30 * 1000; // 30 seconds for both for immediate updates
    
    this.checkInterval = window.setInterval(() => {
      this.checkForUpdates();
    }, interval);

    // Check immediately
    this.checkForUpdates();
  }

  private setupFocusListeners(): void {
    // Check for updates when window gains focus
    window.addEventListener('focus', () => {
      this.checkForUpdates();
    });

    // Check for updates when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdates();
      }
    });
  }

  private async checkForUpdates(): Promise<void> {
    if (!this.swRegistration) return;

    try {
      // Send message to service worker to check for updates
      if (this.swRegistration.active) {
        this.swRegistration.active.postMessage({ type: 'CHECK_UPDATE' });
      }
    } catch (error) {
      // Silent fail for update checks
    }
  }

  public async applyUpdate(): Promise<void> {
    if (!this.swRegistration?.waiting) return;

    try {
      // Tell the waiting service worker to skip waiting and activate
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // The controllerchange event will handle the reload
    } catch (error) {
      // Silent fail for update application
    }
  }

  public async forceUpdate(): Promise<void> {
    // Force check for updates
    await this.checkForUpdates();
    
    // If update is available, apply it
    if (this.updateAvailableSubject.value.available) {
      await this.applyUpdate();
    }
  }

  public getCurrentVersion(): string {
    return '1.0.1'; // This should match the CACHE_VERSION in sw.js
  }

  public isUpdateAvailable(): boolean {
    return this.updateAvailableSubject.value.available;
  }

  public clearUpdateNotification(): void {
    this.ngZone.run(() => {
      this.updateAvailableSubject.next({ available: false });
    });
  }

  ngOnDestroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

