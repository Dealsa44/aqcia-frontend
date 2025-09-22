// pages/market-products/market-products.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { marketProductsMocks } from '../../core/mocks/market-products.mocks';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-market-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './market-products.component.html',
  styleUrls: ['./market-products.component.scss']
})
export class MarketProductsComponent {
  marketId: string = '';
  categoryId: string = '';
  market: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  category: any = null;
  marketProductsMocks = marketProductsMocks;

  // Search and filtering
  searchTerm = '';
  selectedCategories: string[] = [];
  availableCategories: any[] = [];
  showCategoryModal = false;
  modalSearchTerm = '';
  filteredModalCategories: any[] = [];

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

    // Initialize filtered products
    this.filteredProducts = [...this.products];

    // Get available categories for this market
    this.availableCategories = productsMocks.categories.filter(category => 
      this.products.some(product => product.category === category.id)
    );

    // Initialize filtered modal categories
    this.filteredModalCategories = [...this.availableCategories];

    if (this.categoryId) {
      this.category = productsMocks.categories.find(c => c.id === this.categoryId);
    }
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  addToCart(product: any, event?: MouseEvent) {
  const marketPrice = product.prices.find((p: any) =>
    p.market.toLowerCase() === this.marketId.toLowerCase()
  );

  if (marketPrice) {
    this.cartService.addToCartWithAnimation({
      ...product,
      price: marketPrice.price - (marketPrice.discount || 0),
      market: this.marketId
    }, event);
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

  // Search and filtering methods
  searchProducts() {
    this.applyFilters();
  }

  openCategoryModal() {
    this.showCategoryModal = true;
    this.modalSearchTerm = '';
    this.filteredModalCategories = [...this.availableCategories];
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
  }

  filterModalCategories() {
    if (!this.modalSearchTerm.trim()) {
      this.filteredModalCategories = [...this.availableCategories];
      return;
    }

    const searchLower = this.modalSearchTerm.toLowerCase();
    this.filteredModalCategories = this.availableCategories.filter(category => {
      const name = this.getCurrentText(category.name).toLowerCase();
      return name.includes(searchLower);
    });
  }

  onCategoryCheckboxChange(event: any) {
    const categoryId = event.target.value;
    if (event.target.checked) {
      if (!this.selectedCategories.includes(categoryId)) {
        this.selectedCategories.push(categoryId);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
  }

  getProductsInCategoryCount(categoryId: string): number {
    return this.products.filter(product => product.category === categoryId).length;
  }

  applyCategoryFilters() {
    this.applyFilters();
    this.closeCategoryModal();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategories = [];
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product => {
        const name = this.getCurrentText(product.name).toLowerCase();
        const description = this.getCurrentText(product.description).toLowerCase();
        return name.includes(searchLower) || description.includes(searchLower);
      });
    }

    // Apply category filter
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        this.selectedCategories.includes(product.category)
      );
    }

    this.filteredProducts = filtered;
  }
}