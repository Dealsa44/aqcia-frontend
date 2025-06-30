// pages/product/product.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks'; // Assuming this mock exists for product data
import { productMocks } from '../../core/mocks/product.mock';
import { CartService } from '../../core/services/cart.service'; // Assuming this service exists
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
  productData = productMocks; // Assign productMocks to a property

  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public cartService: CartService
  ) {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      // Assuming productsMocks contains an array named 'products'
      this.product = productsMocks.products.find(p => p.id === productId);
    });
  }

  getCurrentText(items: string[] | any[]) {
    // This is a safety check for when product.name or product.description might not be an array
    // if you have some products defined without multi-language support in productsMocks.
    // If all product names/descriptions are guaranteed to be arrays, this can be simplified.
    if (Array.isArray(items)) {
        return items[this.languageService.getCurrentLanguage()];
    }
    return items; // Fallback if it's not an array (e.g., a simple string directly from productsMocks)
  }

  getLowestPrice(product: any) {
    const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p: any) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market.market };
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      id: product.id,
      // Ensure that name is the current language string before passing to cart service
      name: this.getCurrentText(product.name),
      price: this.getLowestPrice(product).price,
      image: product.image,
      quantity: 1
    });
  }
}