import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PWAInstallPrompt {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Injectable({
  providedIn: 'root'
})
export class PWAService {
  private installPromptSubject = new BehaviorSubject<PWAInstallPrompt | null>(null);
  private updateAvailableSubject = new BehaviorSubject<boolean>(false);
  private isOnlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  
  public installPrompt$ = this.installPromptSubject.asObservable();
  public updateAvailable$ = this.updateAvailableSubject.asObservable();
  public isOnline$ = this.isOnlineSubject.asObservable();

  constructor() {
    this.initializePWA();
  }

  private initializePWA(): void {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPromptSubject.next(e as unknown as PWAInstallPrompt);
    });

    // Listen for app installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.installPromptSubject.next(null);
      this.trackInstallation();
    });

    // Listen for online/offline status
    window.addEventListener('online', () => {
      this.isOnlineSubject.next(true);
    });

    window.addEventListener('offline', () => {
      this.isOnlineSubject.next(false);
    });

    // Disabled automatic update checking to prevent reload loops
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.addEventListener('message', (event) => {
    //     if (event.data.type === 'UPDATE_AVAILABLE') {
    //       this.updateAvailableSubject.next(true);
    //     }
    //   });
    // }
  }

  async installApp(): Promise<boolean> {
    const prompt = this.installPromptSubject.value;
    if (!prompt) {
      return false;
    }

    try {
      await prompt.prompt();
      const choiceResult = await prompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        this.trackInstallation();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  }

  async updateApp(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        // Don't auto-reload, let user decide
        console.log('Update applied, please refresh manually');
      }
    }
  }

  async checkForUpdates(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
      }
    }
  }

  async getCacheSize(): Promise<number> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      let totalSize = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();

        for (const request of keys) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return totalSize;
    }
    return 0;
  }

  async clearCache(): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
  }

  isInstallable(): boolean {
    return this.installPromptSubject.value !== null;
  }

  isUpdateAvailable(): boolean {
    return this.updateAvailableSubject.value;
  }

  isOnline(): boolean {
    return this.isOnlineSubject.value;
  }

  private trackInstallation(): void {
    // Track installation in analytics
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'pwa_install', {
        event_category: 'PWA',
        event_label: 'App Installed'
      });
    }

    // Store installation timestamp
    localStorage.setItem('pwa_installed', new Date().toISOString());
  }

  getInstallationDate(): Date | null {
    const installed = localStorage.getItem('pwa_installed');
    return installed ? new Date(installed) : null;
  }

  async shareApp(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Markets Startup',
          text: 'Check out this grocery price comparison app!',
          url: window.location.origin
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin);
        // You could show a toast notification here
        console.log('App URL copied to clipboard');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  }

  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if ('Notification' in window && Notification.permission === 'granted') {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.showNotification(title, {
          icon: '/assets/icons/icon-192x192.png',
          badge: '/assets/icons/icon-72x72.png',
          ...options
        });
      }
    }
  }
}
