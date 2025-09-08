import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pull-to-refresh',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      #container
      class="pull-to-refresh-container"
      [class.pulling]="isPulling"
      [class.refreshing]="isRefreshing"
      [style.transform]="'translateY(' + pullDistance + 'px)'"
    >
      <div class="pull-indicator" [class.visible]="isPulling || isRefreshing">
        @if (isRefreshing) {
          <app-loading-spinner size="small" message="Refreshing..."></app-loading-spinner>
        } @else if (isPulling) {
          <div class="pull-icon" [style.transform]="'rotate(' + (pullDistance * 0.5) + 'deg)'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        }
      </div>
      
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .pull-to-refresh-container {
      position: relative;
      transition: transform 0.3s ease-out;
    }

    .pull-indicator {
      position: absolute;
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 100%;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .pull-indicator.visible {
      opacity: 1;
    }

    .pull-icon {
      color: var(--color-primary);
      transition: transform 0.2s ease;
    }

    .content {
      min-height: 100vh;
    }

    .pulling .content {
      transition: none;
    }

    .refreshing .content {
      pointer-events: none;
    }
  `]
})
export class PullToRefreshComponent {
  @Input() threshold: number = 80;
  @Input() disabled: boolean = false;
  @Output() refresh = new EventEmitter<void>();

  @ViewChild('container', { static: true }) container!: ElementRef;

  isPulling = false;
  isRefreshing = false;
  pullDistance = 0;
  startY = 0;
  currentY = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.disabled || this.isRefreshing) return;
    
    this.startY = event.touches[0].clientY;
    this.isPulling = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.disabled || this.isRefreshing || !this.isPulling) return;

    this.currentY = event.touches[0].clientY;
    const deltaY = this.currentY - this.startY;
    
    if (deltaY > 0) {
      // Only allow pull down when at the top
      if (window.scrollY === 0) {
        this.pullDistance = Math.min(deltaY * 0.5, this.threshold * 1.5);
        event.preventDefault();
      }
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.disabled || this.isRefreshing || !this.isPulling) return;

    this.isPulling = false;
    
    if (this.pullDistance >= this.threshold) {
      this.triggerRefresh();
    } else {
      this.resetPull();
    }
  }

  private triggerRefresh() {
    this.isRefreshing = true;
    this.pullDistance = this.threshold;
    
    this.refresh.emit();
    
    // Auto reset after 2 seconds if not manually reset
    setTimeout(() => {
      this.resetPull();
    }, 2000);
  }

  private resetPull() {
    this.isPulling = false;
    this.isRefreshing = false;
    this.pullDistance = 0;
    this.startY = 0;
    this.currentY = 0;
  }

  // Method to call when refresh is complete
  completeRefresh() {
    this.resetPull();
  }
}
