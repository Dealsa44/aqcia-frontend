// pages/market-products/market-products.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { marketProductsMocks } from '../../core/mocks/market-products.mocks'; // <--- Add this import
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-market-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './market-products.component.html',
  styleUrls: ['./market-products.component.scss']
})
export class MarketProductsComponent {
  marketId: string = '';
  categoryId: string = '';
  market: any;
  products: any[] = [];
  category: any = null;
  marketProductsMocks = marketProductsMocks; // <--- Add this line to make it accessible in the template

  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private router: Router,
    public cartService: CartService
  ) {
    this.route.params.subscribe(params => {
      this.marketId = params['marketId'];
      this.categoryId = params['categoryId'];
      this.loadProducts();
    });
  }

  loadProducts() {
    this.market = marketsMocks.stores.find(store =>
      store.name[0].toLowerCase() === this.marketId.toLowerCase()
    );

    if (!this.market) {
      this.router.navigate(['/', this.languageService.getCurrentLanguageCode(), 'markets']);
      return;
    }

    // Filter products by market and optionally by category
    this.products = productsMocks.products.filter(product => {
      const matchesMarket = product.prices.some(
        (price: any) => price.market.toLowerCase() === this.marketId.toLowerCase()
      );

      if (this.categoryId) {
        return matchesMarket && product.category === this.categoryId;
      }
      return matchesMarket;
    });

    if (this.categoryId) {
      this.category = productsMocks.categories.find(c => c.id === this.categoryId);
    }
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  addToCart(product: any) {
    const marketPrice = product.prices.find((p: any) =>
      p.market.toLowerCase() === this.marketId.toLowerCase()
    );

    if (marketPrice) {
      this.cartService.addToCart({
        id: product.id,
        name: product.name,
        price: marketPrice.price - (marketPrice.discount || 0),
        image: product.image,
        quantity: 1,
        market: this.marketId
      });
    }
  }

  getMarketPrice(product: any): number {
    const price = product.prices.find((p: any) =>
      p.market.toLowerCase() === this.marketId.toLowerCase()
    );
    return price ? price.price - (price.discount || 0) : 0;
  }

  hasDiscount(product: any): boolean {
    const price = product.prices.find((p: any) =>
      p.market.toLowerCase() === this.marketId.toLowerCase()
    );
    return price ? price.discount > 0 : false;
  }

  getDiscount(product: any): number {
    const price = product.prices.find((p: any) =>
      p.market.toLowerCase() === this.marketId.toLowerCase()
    );
    if (price) {
      const discountPercentage = (price.discount / price.price) * 100;
      // Round up to 2 decimal places
      return Math.ceil(discountPercentage * 100) / 100;
    }
    return 0;
  }
}