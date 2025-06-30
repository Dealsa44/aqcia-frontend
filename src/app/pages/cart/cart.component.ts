// pages/cart/cart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { productsMocks } from '../../core/mocks/products.mocks';
import { cartMocks } from '../../core/mocks/cart.mocks';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  productsMocks = productsMocks;
  cartMocks = cartMocks;
  private suggestedProductsCache: any[] = [];

  constructor(
    public languageService: LanguageService,
    public cartService: CartService
  ) {}

  getCurrentText(items: string[] | any[]) {
    if (!items) return '';
    return items[this.languageService.getCurrentLanguage()];
  }

  getProductById(id: number) {
    return productsMocks.products.find(p => p.id === id);
  }

  getTotal() {
    return this.cartService.getCartItems().reduce((total, item) => {
      const product = this.getProductById(item.id);
      if (!product) return total;
      const price = this.getLowestPrice(product).price;
      return total + (price * item.quantity);
    }, 0);
  }

  getLowestPrice(product: any) {
    const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p: any) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market.market };
  }

  // Get suggested products for empty cart state
  getSuggestedProducts() {
  if (this.suggestedProductsCache.length === 0) {
    const shuffled = [...productsMocks.products].sort(() => 0.5 - Math.random());
    this.suggestedProductsCache = shuffled.slice(0, 9);
  }
  return this.suggestedProductsCache;
}

  addToCart(product: any) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: this.getLowestPrice(product).price,
      image: product.image,
      quantity: 1,
    });
  }
}