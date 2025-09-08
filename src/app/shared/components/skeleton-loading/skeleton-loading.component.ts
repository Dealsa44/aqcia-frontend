import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-container" [ngClass]="containerClass">
      @if (type === 'text') {
        <div class="skeleton skeleton-text" [style.width]="width"></div>
      } @else if (type === 'avatar') {
        <div class="skeleton skeleton-avatar" [style.width]="size" [style.height]="size"></div>
      } @else if (type === 'button') {
        <div class="skeleton skeleton-button" [style.width]="width"></div>
      } @else if (type === 'card') {
        <div class="skeleton skeleton-card" [style.height]="height"></div>
      } @else if (type === 'list') {
        @for (item of [].constructor(lines); track $index) {
          <div class="skeleton skeleton-text" [style.width]="getLineWidth($index)"></div>
        }
      } @else if (type === 'product-card') {
        <div class="skeleton-product-card">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 60%"></div>
          <div class="skeleton skeleton-text" style="width: 40%"></div>
        </div>
      } @else if (type === 'navbar') {
        <div class="skeleton-navbar">
          <div class="skeleton skeleton-avatar"></div>
          <div class="skeleton skeleton-text" style="width: 100px"></div>
          <div class="skeleton skeleton-button" style="width: 40px"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    .skeleton-container {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .skeleton-product-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-4);
      border-radius: var(--border-radius-lg);
      background: var(--bg-primary);
      box-shadow: var(--shadow);
    }

    .skeleton-image {
      width: 100%;
      height: 120px;
      border-radius: var(--border-radius);
    }

    .skeleton-navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4);
      background: var(--bg-primary);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow);
    }

    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `]
})
export class SkeletonLoadingComponent {
  @Input() type: 'text' | 'avatar' | 'button' | 'card' | 'list' | 'product-card' | 'navbar' = 'text';
  @Input() width: string = '100%';
  @Input() height: string = '200px';
  @Input() size: string = '40px';
  @Input() lines: number = 3;
  @Input() containerClass: string = '';

  getLineWidth(index: number): string {
    const widths = ['100%', '85%', '70%', '90%', '60%'];
    return widths[index % widths.length];
  }
}
