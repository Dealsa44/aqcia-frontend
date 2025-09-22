import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileBrowserService {
  
  constructor() { }

  /**
   * Detect if the current browser is mobile
   */
  isMobileBrowser(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  /**
   * Get mobile browser type
   */
  getMobileBrowserType(): string {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    if (/Android/i.test(userAgent)) {
      return 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return 'iOS';
    } else if (/BlackBerry/i.test(userAgent)) {
      return 'BlackBerry';
    } else if (/IEMobile/i.test(userAgent)) {
      return 'Windows Mobile';
    } else if (/Opera Mini/i.test(userAgent)) {
      return 'Opera Mini';
    } else if (/webOS/i.test(userAgent)) {
      return 'webOS';
    }
    
    return 'Unknown Mobile';
  }

  /**
   * Check if the browser supports modern features
   */
  supportsModernFeatures(): boolean {
    return !!(
      window.fetch &&
      window.Promise &&
      window.localStorage &&
      window.sessionStorage &&
      'serviceWorker' in navigator
    );
  }

  /**
   * Get mobile-specific headers for API requests
   */
  getMobileHeaders(): { [key: string]: string } {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };

    if (this.isMobileBrowser()) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
      headers['X-Mobile-Client'] = this.getMobileBrowserType();
    }

    return headers;
  }

  /**
   * Check if the device is online
   */
  isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Get connection type if available
   */
  getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  }

  /**
   * Log mobile browser information for debugging
   */
  logMobileInfo(): void {
    console.log('📱 Mobile Browser Info:', {
      isMobile: this.isMobileBrowser(),
      browserType: this.getMobileBrowserType(),
      userAgent: navigator.userAgent,
      supportsModernFeatures: this.supportsModernFeatures(),
      isOnline: this.isOnline(),
      connectionType: this.getConnectionType(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }
}
