// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductAnimationComponent } from './shared/components/product-animation/product-animation.component';
import { PwaUpdateService } from './core/services/pwa-update.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, RouterModule, ProductAnimationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'markets_startup';

  constructor(
    private router: Router,
    private pwaUpdateService: PwaUpdateService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Scroll to top when navigating to a different page
        window.scrollTo(0, 0);
      });

    // Initialize PWA update service
    this.initializePwaUpdates();
  }

  private initializePwaUpdates(): void {
    // Subscribe to update notifications
    this.pwaUpdateService.updateInfo$.subscribe(updateInfo => {
      if (updateInfo.available) {
        // Auto-apply updates in production
        this.pwaUpdateService.showUpdateNotification();
      }
    });
  }
}