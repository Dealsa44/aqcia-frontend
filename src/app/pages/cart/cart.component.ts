import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { productsMocks } from '../../core/mocks/products.mocks';
import { cartMocks } from '../../core/mocks/cart.mocks';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { combinationsMocks } from '../../core/mocks/combinations.mocks';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  combinationsMocks = combinationsMocks;
  productsMocks = productsMocks;
  cartMocks = cartMocks;
  marketsMocks = marketsMocks;
  private suggestedProductsCache: any[] = [];
  marketCombinations: any[] = [];

  // New properties for collapse/expand functionality
  showAllItems: boolean = false; // Initially show only a few items
  maxItemsToShow: number = 3; // Number of items to show before collapsing

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

  addToCart(product: any, event?: MouseEvent) {
    this.cartService.addToCartWithAnimation(
      {
        ...product,
        price: this.getLowestPrice(product).price,
      },
      event
    );
  }

  calculateMarketCombinations() {
    const cartItems = this.cartService.getCartItems();
    const totalItemCount = this.cartService.getTotalItemCount();

    if (totalItemCount === 0) {
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
            availableProducts, // Number of distinct products available
            totalProducts: cartItems.length, // Total distinct products in cart
            totalPrice, // Sum of (price * quantity) for all items
            // Calculate average price per item (including quantities)
            avgPrice:
              totalProductQuantity > 0 ? totalPrice / totalProductQuantity : 0,
            // Calculate availability percentage based on distinct products
            availabilityPercentage:
              (availableProducts / cartItems.length) * 100,
            // Additional metric that considers quantities
            quantityCoveragePercentage:
              (totalProductQuantity / totalItemCount) * 100,
          };
        }
      }
    );

    // Convert to array and sort by best combination
    this.marketCombinations = Object.values(marketStats)
      .map((market: any) => ({
        ...market,
        // Enhanced scoring that considers both availability and price efficiency
        score:
          market.availabilityPercentage * 0.5 + // Weight for product availability
          market.quantityCoveragePercentage * 0.3 + // Weight for quantity coverage
          (market.avgPrice > 0 ? (1 / market.avgPrice) * 1000 : 0) * 0.2, // Weight for price
      }))
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 3); // Display top 3 best combinations

    // Add best badge to the first item
    if (this.marketCombinations.length > 0) {
      this.marketCombinations[0].isBest = true;
    }
  }

  // New method to toggle the display of all cart items
  toggleShowAllItems() {
    this.showAllItems = !this.showAllItems;
  }
}
