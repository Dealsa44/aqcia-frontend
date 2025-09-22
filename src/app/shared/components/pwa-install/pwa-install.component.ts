import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PWAService } from '../../../core/services/pwa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pwa-install',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pwa-install-container" *ngIf="showInstallPrompt">
      <div class="pwa-install-card">
        <div class="pwa-install-header">
          <div class="pwa-install-icon">📱</div>
          <h3>Install Markets App</h3>
        </div>
        
        <div class="pwa-install-content">
          <p>Get quick access to compare grocery prices and find the best deals!</p>
          
          <div class="pwa-features">
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>Fast loading</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📱</span>
              <span>Works offline</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔔</span>
              <span>Price alerts</span>
            </div>
          </div>
        </div>
        
        <div class="pwa-install-actions">
          <button class="btn-secondary" (click)="dismissInstall()">
            Not now
          </button>
          <button class="btn-primary" (click)="installApp()">
            Install App
          </button>
        </div>
      </div>
    </div>

    <div class="pwa-update-banner" *ngIf="showUpdateBanner">
      <div class="update-content">
        <span class="update-icon">🔄</span>
        <span>New version available!</span>
        <button class="btn-update" (click)="updateApp()">Update</button>
        <button class="btn-dismiss" (click)="dismissUpdate()">×</button>
      </div>
    </div>

    <div class="pwa-offline-indicator" *ngIf="!isOnline">
      <span class="offline-icon">📡</span>
      <span>You're offline</span>
    </div>
  `,
  styles: [`
    .pwa-install-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .pwa-install-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .pwa-install-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .pwa-install-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .pwa-install-header h3 {
      margin: 0;
      color: #1976d2;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .pwa-install-content {
      margin-bottom: 24px;
    }

    .pwa-install-content p {
      color: #666;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .pwa-features {
      display: flex;
      justify-content: space-around;
      margin-top: 16px;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .feature-icon {
      font-size: 24px;
      margin-bottom: 4px;
    }

    .feature-item span:last-child {
      font-size: 0.9rem;
      color: #666;
    }

    .pwa-install-actions {
      display: flex;
      gap: 12px;
    }

    .btn-primary, .btn-secondary {
      flex: 1;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #1976d2;
      color: white;
    }

    .btn-primary:hover {
      background: #1565c0;
    }

    .btn-secondary {
      background: #f5f5f5;
      color: #666;
    }

    .btn-secondary:hover {
      background: #eeeeee;
    }

    .pwa-update-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #1976d2;
      color: white;
      padding: 12px 20px;
      z-index: 999;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .update-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .update-icon {
      font-size: 20px;
    }

    .btn-update {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-update:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .btn-dismiss {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pwa-offline-indicator {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      z-index: 998;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .offline-icon {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      .pwa-install-card {
        margin: 20px;
        padding: 20px;
      }

      .pwa-features {
        flex-direction: column;
        gap: 12px;
      }

      .feature-item {
        flex-direction: row;
        justify-content: flex-start;
      }

      .feature-icon {
        margin-right: 8px;
        margin-bottom: 0;
      }
    }
  `]
})
export class PWAInstallComponent implements OnInit, OnDestroy {
  showInstallPrompt = false;
  showUpdateBanner = false;
  isOnline = true;
  
  private subscriptions: Subscription[] = [];

  constructor(private pwaService: PWAService) {}

  ngOnInit(): void {
    // Subscribe to install prompt
    this.subscriptions.push(
      this.pwaService.installPrompt$.subscribe((prompt: any) => {
        this.showInstallPrompt = prompt !== null;
      })
    );

    // Subscribe to update availability
    this.subscriptions.push(
      this.pwaService.updateAvailable$.subscribe((available: boolean) => {
        this.showUpdateBanner = available;
      })
    );

    // Subscribe to online status
    this.subscriptions.push(
      this.pwaService.isOnline$.subscribe((online: boolean) => {
        this.isOnline = online;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async installApp(): Promise<void> {
    const installed = await this.pwaService.installApp();
    if (installed) {
      this.showInstallPrompt = false;
    }
  }

  dismissInstall(): void {
    this.showInstallPrompt = false;
  }

  async updateApp(): Promise<void> {
    await this.pwaService.updateApp();
    this.showUpdateBanner = false;
  }

  dismissUpdate(): void {
    this.showUpdateBanner = false;
  }
}
