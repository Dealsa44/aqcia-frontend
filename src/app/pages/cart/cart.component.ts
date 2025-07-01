// pages/cart/cart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { productsMocks } from '../../core/mocks/products.mocks';
import { cartMocks } from '../../core/mocks/cart.mocks';
import { marketsMocks } from '../../core/mocks/markets.mocks';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  productsMocks = productsMocks;
  cartMocks = cartMocks;
  marketsMocks = marketsMocks;
  private suggestedProductsCache: any[] = [];
  marketCombinations: any[] = [];

  constructor(
    public languageService: LanguageService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.calculateMarketCombinations();
    this.cartService.cart$.subscribe(() => {
      this.calculateMarketCombinations();
    });
  }

  getCurrentText(items: string[] | any[]) {
    if (!items) return '';
    return items[this.languageService.getCurrentLanguage()];
  }

  getProductById(id: number) {
    return productsMocks.products.find((p) => p.id === id);
  }

  getTotal() {
    return this.cartService.getCartItems().reduce((total, item) => {
      const product = this.getProductById(item.id);
      if (!product) return total;
      const price = this.getLowestPrice(product).price;
      return total + price * item.quantity;
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
      const shuffled = [...productsMocks.products].sort(
        () => 0.5 - Math.random()
      );
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

  calculateMarketCombinations() {
    const cartItems = this.cartService.getCartItems();
    if (cartItems.length === 0) {
      this.marketCombinations = []; // Clear combinations if cart is empty
      return;
    }

    const marketStats: any = {};

    this.marketsMocks.stores.forEach(
      (store: { name: string[]; image: string }) => {
        const marketName = store.name[0];
        let totalPrice = 0;
        let availableProducts = 0;
        let totalProductQuantity = 0; // Track total quantity for avgPrice calculation

        cartItems.forEach((item) => {
          const product = this.getProductById(item.id);
          if (!product) return;

          const marketPriceInfo = product.prices.find(
            (p: any) => p.market === marketName
          );

          if (marketPriceInfo) {
            availableProducts++;
            totalPrice +=
              (marketPriceInfo.price - (marketPriceInfo.discount || 0)) *
              item.quantity;
            totalProductQuantity += item.quantity;
          }
        });

        // Only include markets that have at least one product from the cart
        if (availableProducts > 0) {
          marketStats[marketName] = {
            name: store.name,
            image: store.image,
            availableProducts,
            totalProducts: cartItems.length,
            totalPrice,
            // Ensure totalProductQuantity is not zero to avoid division by zero
            avgPrice: totalProductQuantity > 0 ? totalPrice / totalProductQuantity : 0,
            availabilityPercentage:
              (availableProducts / cartItems.length) * 100,
          };
        }
      }
    );

    // Convert to array and sort by best combination
    this.marketCombinations = Object.values(marketStats)
      .map((market: any) => ({
        ...market,
        // New scoring: Prioritize availability more strongly (e.g., 70% availability, 30% price)
        // Adjust the weights (0.7 and 0.3) as needed to fine-tune the importance
        // Lower avgPrice means higher score contribution
        score:
          market.availabilityPercentage * 0.7 +
          (market.avgPrice > 0 ? (1 / market.avgPrice) * 1000 : 0) * 0.3, // Add a check for avgPrice > 0
      }))
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3); // Display top 3 best combinations
  }
}