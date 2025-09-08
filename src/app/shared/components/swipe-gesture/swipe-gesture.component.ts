import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-swipe-gesture',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      #container
      class="swipe-container"
      [class.swiping]="isSwiping"
      [style.transform]="'translateX(' + translateX + 'px)'"
    >
      <ng-content></ng-content>
      
      @if (showSwipeIndicator) {
        <div class="swipe-indicator" [class.visible]="isSwiping">
          <div class="swipe-arrow">
            <i class="fa fa-chevron-right"></i>
          </div>
          <span>{{ swipeText }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .swipe-container {
      position: relative;
      transition: transform 0.3s ease-out;
      touch-action: pan-y;
    }

    .swipe-container.swiping {
      transition: none;
    }

    .swipe-indicator {
      position: absolute;
      top: 50%;
      right: var(--space-4);
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      color: var(--color-primary);
    }

    .swipe-indicator.visible {
      opacity: 1;
    }

    .swipe-arrow {
      width: 40px;
      height: 40px;
      background: var(--color-primary);
      color: var(--color-white);
      border-radius: var(--border-radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bounce 1s infinite;
    }

    .swipe-indicator span {
      font-size: var(--font-size-xs);
      font-weight: 500;
      text-align: center;
      background: var(--color-white);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  `]
})
export class SwipeGestureComponent {
  @Input() swipeText: string = 'Swipe';
  @Input() showSwipeIndicator: boolean = false;
  @Input() threshold: number = 50;
  @Input() disabled: boolean = false;
  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();
  @Output() swipeUp = new EventEmitter<void>();
  @Output() swipeDown = new EventEmitter<void>();

  @ViewChild('container', { static: true }) container!: ElementRef;

  isSwiping = false;
  translateX = 0;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (this.disabled) return;
    
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.isSwiping = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.disabled || !this.isSwiping) return;

    this.currentX = event.touches[0].clientX;
    this.currentY = event.touches[0].clientY;
    
    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;
    
    // Only apply horizontal translation for horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      this.translateX = deltaX * 0.3; // Dampen the movement
      event.preventDefault();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.disabled || !this.isSwiping) return;

    this.isSwiping = false;
    
    const deltaX = this.currentX - this.startX;
    const deltaY = this.currentY - this.startY;
    
    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > this.threshold) {
        if (deltaX > 0) {
          this.swipeRight.emit();
        } else {
          this.swipeLeft.emit();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > this.threshold) {
        if (deltaY > 0) {
          this.swipeDown.emit();
        } else {
          this.swipeUp.emit();
        }
      }
    }
    
    // Reset position
    this.translateX = 0;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
  }
}
