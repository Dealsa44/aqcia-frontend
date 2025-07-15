// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { FormsModule } from '@angular/forms';
import { homeMocks } from '../../core/mocks/home.mocks';
import { productsMocks } from '../../core/mocks/products.mocks'; // Add this import

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchTerm = '';
  homeData = homeMocks;
  private featuredProductsCache: any[] = []; // Cache for random products

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(
        ['/', this.languageService.getCurrentLanguageCode(), 'catalog'],
        {
          queryParams: { q: this.searchTerm },
          queryParamsHandling: 'merge',
        }
      );
    }
  }

  // Method to get random featured products
  getFeaturedProducts() {
    if (this.featuredProductsCache.length === 0) {
      const shuffled = [...productsMocks.products].sort(
        () => 0.5 - Math.random()
      );
      this.featuredProductsCache = shuffled.slice(0, 4); // Get 4 random products
    }
    return this.featuredProductsCache;
  }

  // Method to get lowest price (similar to cart component)
  getLowestPrice(product: any) {
    if (!product.prices) return { price: 0, market: '' };
    const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p: any) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market?.market || '' };
  }
  // Update the home component to add this method
  viewStore(storeName: string) {
    this.router.navigate([
      '/',
      this.languageService.getCurrentLanguageCode(),
      'market-details',
      storeName.toLowerCase(),
    ]);
  }
}
