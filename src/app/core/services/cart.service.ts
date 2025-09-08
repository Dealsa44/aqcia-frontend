// core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductAnimationService } from './product-animation.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  // Expose as public readonly Observable
  public readonly cart$: Observable<any[]> = this.cartSubject.asObservable();

  constructor(private productAnimationService: ProductAnimationService) {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]); // Emit new array reference
  }

  getCartItems() {
    return [...this.cartItems];
  }

  getCart() {
    return {
      items: [...this.cartItems],
      total: this.getTotalPrice(),
      count: this.getTotalItems()
    };
  }

  /**
   * Unified method to add product to cart with optional animation
   * @param product The product to add
   * @param event Optional click event for animation
   */
  addToCartWithAnimation(product: any, event?: MouseEvent) {
    // Trigger animation if event is provided
    if (event) {
      this.productAnimationService.triggerAnimation(
        product,
        'assets/imgs/products/' + product.image,
        event
      );
    }

    // Add to cart
    const existingItem = this.cartItems.find(i => i.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ 
        id: product.id,
        name: product.name,
        price: product.price || this.getProductPrice(product),
        image: product.image,
        quantity: 1,
        market: product.market
      });
    }
    this.saveCart();
  }

  /**
   * Legacy addToCart method (kept for backward compatibility)
   * @deprecated Use addToCartWithAnimation instead
   */
  addToCart(item: any) {
    this.addToCartWithAnimation(item);
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCart();
  }

  increaseQuantity(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
      this.saveCart();
    }
  }

  decreaseQuantity(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(id);
      }
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  /**
   * Helper method to get product price if not provided
   * @param product The product to get price for
   * @returns The lowest available price
   */
  private getProductPrice(product: any): number {
    if (product.prices && product.prices.length > 0) {
      const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
      return Math.min(...prices);
    }
    return product.price || 0;
  }

  /**
   * Calculates the total price of all items in cart
   * @returns Total price
   */
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
   getTotalItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}