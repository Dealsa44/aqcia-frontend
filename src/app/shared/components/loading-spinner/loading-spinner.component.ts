import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-spinner" [ngClass]="containerClass">
      <div class="spinner" [ngClass]="spinnerClass">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      @if (message) {
        <p class="loading-message">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      padding: var(--space-6);
    }

    .spinner {
      position: relative;
      width: 40px;
      height: 40px;
    }

    .spinner.small {
      width: 24px;
      height: 24px;
    }

    .spinner.large {
      width: 56px;
      height: 56px;
    }

    .spinner-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    .spinner-ring:nth-child(1) {
      animation-delay: -0.45s;
    }

    .spinner-ring:nth-child(2) {
      animation-delay: -0.3s;
    }

    .spinner-ring:nth-child(3) {
      animation-delay: -0.15s;
    }

    .spinner-ring:nth-child(4) {
      animation-delay: 0s;
    }

    .loading-message {
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
      text-align: center;
      margin: 0;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    /* Overlay variant */
    .loading-spinner.overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-overlay);
      z-index: var(--z-modal);
    }

    /* Inline variant */
    .loading-spinner.inline {
      padding: var(--space-2);
      flex-direction: row;
      gap: var(--space-2);
    }

    .loading-spinner.inline .loading-message {
      font-size: var(--font-size-xs);
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'default' | 'overlay' | 'inline' = 'default';
  @Input() message: string = '';
  @Input() containerClass: string = '';

  get spinnerClass(): string {
    return this.size === 'small' ? 'small' : this.size === 'large' ? 'large' : '';
  }
}
