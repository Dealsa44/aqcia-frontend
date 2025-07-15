// src/app/pages/combinations/combinations.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { productsMocks } from '../../core/mocks/products.mocks';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { combinationsMocks } from '../../core/mocks/combinations.mocks';
import { cartMocks } from '../../core/mocks/cart.mocks';

@Component({
  selector: 'app-combinations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.scss'],
})
export class CombinationsComponent {
  cartMocks = cartMocks;
  productsMocks = productsMocks;
  marketsMocks = marketsMocks;
  combinationsMocks = combinationsMocks;
  marketCombinations: any[] = [];

  constructor(
    public languageService: LanguageService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.calculateAllMarketCombinations();
    this.cartService.cart$.subscribe(() => {
      this.calculateAllMarketCombinations();
    });
  }

  getCurrentText(items: string[] | any[]) {
    if (!items) return '';
    return items[this.languageService.getCurrentLanguage()];
  }

  calculateAllMarketCombinations() {
    const cartItems = this.cartService.getCartItems();
    const totalItemCount = this.cartService.getTotalItemCount();

    if (totalItemCount === 0) {
      this.marketCombinations = [];
      return;
    }

    const marketStats: any = {};

    this.marketsMocks.stores.forEach(
      (store: { name: string[]; image: string }) => {
        const marketName = store.name[0];
        let totalPrice = 0;
        let availableProducts = 0;
        let totalProductQuantity = 0;

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

        if (availableProducts > 0) {
          marketStats[marketName] = {
            name: store.name,
            image: store.image,
            availableProducts,
            totalProducts: cartItems.length,
            totalPrice,
            avgPrice: totalProductQuantity > 0 ? totalPrice / totalProductQuantity : 0,
            availabilityPercentage: (availableProducts / cartItems.length) * 100,
            quantityCoveragePercentage: (totalProductQuantity / totalItemCount) * 100,
          };
        }
      }
    );

    this.marketCombinations = Object.values(marketStats)
      .map((market: any) => ({
        ...market,
        score:
          market.availabilityPercentage * 0.5 +
          market.quantityCoveragePercentage * 0.3 +
          (market.avgPrice > 0 ? (1 / market.avgPrice) * 1000 : 0) * 0.2,
      }))
      .sort((a: any, b: any) => b.score - a.score);

    if (this.marketCombinations.length > 0) {
      this.marketCombinations[0].isBest = true;
    }
  }

  getProductById(id: number) {
    return productsMocks.products.find((p) => p.id === id);
  }
}