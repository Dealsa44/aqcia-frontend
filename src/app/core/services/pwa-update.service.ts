import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceWorkerManagerService, UpdateInfo } from './service-worker-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PwaUpdateService {
  private updateInfoSubject = new BehaviorSubject<UpdateInfo>({ available: false });
  public updateInfo$ = this.updateInfoSubject.asObservable();

  constructor(
    private swManager: ServiceWorkerManagerService,
    private ngZone: NgZone
  ) {
    this.initializeUpdateService();
  }

  private initializeUpdateService(): void {
    // Subscribe to service worker manager updates
    this.swManager.updateAvailable$.subscribe(updateInfo => {
      this.ngZone.run(() => {
        this.updateInfoSubject.next(updateInfo);
      });
    });

    // Setup keyboard shortcut (Ctrl+U)
    this.setupKeyboardShortcut();
  }

  private setupKeyboardShortcut(): void {
    document.addEventListener('keydown', (event) => {
      // Check for Ctrl+U (or Cmd+U on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'u') {
        event.preventDefault();
        this.checkForUpdates();
      }
    });
  }

  public getUpdateInfo(): UpdateInfo {
    return this.updateInfoSubject.value;
  }

  public isUpdateAvailable(): boolean {
    return this.updateInfoSubject.value.available;
  }

  public async checkForUpdates(): Promise<void> {
    await this.swManager.forceUpdate();
  }

  public async applyUpdate(): Promise<void> {
    await this.swManager.applyUpdate();
  }

  public clearUpdateNotification(): void {
    this.swManager.clearUpdateNotification();
  }

  public getCurrentVersion(): string {
    return this.swManager.getCurrentVersion();
  }

  // Method to show update notification (you can customize this)
  public showUpdateNotification(): void {
    if (this.isUpdateAvailable()) {
      // Auto-apply updates
      this.applyUpdate();
    }
  }
}
