import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductAnimationService } from '../../../core/services/product-animation.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

interface AnimationInstance {
  id: string;
  image: string;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
}

@Component({
  selector: 'app-product-animation',
  imports: [CommonModule],
  templateUrl: './product-animation.component.html',
  styleUrl: './product-animation.component.scss',
})
export class ProductAnimationComponent implements OnInit, OnDestroy {
  activeAnimations: AnimationInstance[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private productAnimationService: ProductAnimationService) {}

  ngOnInit() {
    this.subscription = this.productAnimationService.currentAnimation.subscribe(
      (data) => {
        if (data) {
          this.startAnimation(data.image, data.clickX, data.clickY);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startAnimation(image: string, startX: number, startY: number) {
    // Try to get the floating cart first, then fall back to navbar cart
    let cartElement = document.querySelector('.floating-cart');
    if (!cartElement) {
      cartElement = document.querySelector('.cart-link');
    }

    const cartRect = cartElement?.getBoundingClientRect();

    if (!cartRect) {
      console.warn('Cart element not found');
      return;
    }

    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    // Calculate the distance to fly
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Create a unique animation instance
    const animationId = `animation-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const animation: AnimationInstance = {
      id: animationId,
      image,
      startX,
      startY,
      deltaX,
      deltaY,
    };

    // Add to active animations
    this.activeAnimations.push(animation);

    // Remove animation after it completes
    setTimeout(() => {
      this.activeAnimations = this.activeAnimations.filter(
        (a) => a.id !== animationId
      );
    }, 1000);
  }
}
