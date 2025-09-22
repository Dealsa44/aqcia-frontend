// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductAnimationComponent } from './shared/components/product-animation/product-animation.component';
import { PWAInstallComponent } from './shared/components/pwa-install/pwa-install.component';
import { MobileBrowserService } from './core/services/mobile-browser.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, RouterModule, ProductAnimationComponent, PWAInstallComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'markets_startup';

  constructor(
    private router: Router,
    private mobileBrowserService: MobileBrowserService
  ) {}

  ngOnInit() {
    // Initialize mobile browser detection and error handling
    this.initializeMobileSupport();
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Scroll to top when navigating to a different page
        window.scrollTo(0, 0);
      });
  }

  private initializeMobileSupport() {
    // Log mobile browser information
    this.mobileBrowserService.logMobileInfo();
    
    // Add global error handlers for mobile browsers
    window.addEventListener('error', (event) => {
      console.error('🚨 Global error caught:', event.error);
      this.handleMobileError(event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      console.error('🚨 Unhandled promise rejection:', event.reason);
      this.handleMobileError(event.reason);
      event.preventDefault();
    });
  }

  private handleMobileError(error: any) {
    // Enhanced error handling for mobile browsers
    if (this.mobileBrowserService.isMobileBrowser()) {
      console.log('📱 Mobile browser error detected, applying mobile-specific handling');
      
      // Check if it's a network error
      if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
        console.log('🌐 Network error detected on mobile browser');
        // Could show a user-friendly message or retry logic here
      }
    }
  }
}