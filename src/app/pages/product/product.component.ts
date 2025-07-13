// pages/product/product.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { productMocks } from '../../core/mocks/product.mock';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: any;
  currentImageIndex = 0;
  productData = productMocks;

  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public cartService: CartService
  ) {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.product = productsMocks.products.find(p => p.id === productId);
    });
  }

  getCurrentText(items: string[] | any[]) {
    if (Array.isArray(items)) {
        return items[this.languageService.getCurrentLanguage()];
    }
    return items;
  }

  getLowestPrice(product: any) {
    const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p: any) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market.market };
  }

  addToCart(product: any, event?: MouseEvent) {
    this.cartService.addToCartWithAnimation({
      id: product.id,
      name: product.name, // Keep as array for language handling
      price: this.getLowestPrice(product).price,
      image: product.image,
      quantity: 1
    }, event);
  }
}