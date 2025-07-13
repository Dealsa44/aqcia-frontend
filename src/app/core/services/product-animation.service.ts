import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductAnimationService {
  private animationSource = new Subject<{
    product: any;
    image: string;
    clickX: number;
    clickY: number;
  } | null>();
  currentAnimation = this.animationSource.asObservable();

  triggerAnimation(product: any, image: string, clickEvent: MouseEvent) {
    // Prevent the event from bubbling up
    clickEvent.stopPropagation();
    
    this.animationSource.next({
      product,
      image,
      clickX: clickEvent.clientX,
      clickY: clickEvent.clientY,
    });
  }
}