// pages/catalog/catalog.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { catalogMocks } from '../../core/mocks/catalog.mocks';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/interfaces/product.interface';
import { ProductAnimationService } from '../../core/services/product-animation.service';
import { ApiService, ApiProduct, ApiCategory, ApiSubcategory, ApiPrice } from '../../core/services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  productsMocks = productsMocks;
  catalogMocks = catalogMocks;
  searchTerm = '';
  // selectedCategory = ''; // No longer needed for single selection
  products: Product[] = []; // Will be populated from API
  categories: any[] = []; // Will be populated from API
  filteredProducts: Product[] = [];
  
  // Loading states
  isLoadingProducts = true;
  isLoadingCategories = true;
  errorMessage = '';

  showCategoryModal = false;
  selectedCategories: string[] = []; // New property to store multiple selected categories
  tempSelectedCategories: string[] = []; // Temporary storage for selections in modal

  modalSearchTerm = '';
  filteredModalCategories: any[] = [];
  allCategories: any[] = [];

  constructor(
    public languageService: LanguageService,
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productAnimationService: ProductAnimationService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadData();
    
    this.route.queryParams.subscribe((params: any) => {
      if (params['q']) {
        this.searchTerm = params['q'];
      }
      // Check for 'categories' query parameter and pre-select them
      if (params['categories']) {
        this.selectedCategories = Array.isArray(params['categories'])
          ? params['categories']
          : [params['categories']];
      }
      this.searchProducts(); // Call searchProducts to apply initial filters
    });
  }

  loadData() {
    console.log('🔄 CatalogComponent - loadData() called');
    console.log('🔗 About to call apiService.getProducts()');
    console.log('🌐 Current window location:', window.location.href);
    console.log('🔒 Current window protocol:', window.location.protocol);
    console.log('🏠 Current window origin:', window.location.origin);
    console.log('🔍 Document location:', document.location.href);
    console.log('🔍 Document protocol:', document.location.protocol);
    console.log('🔍 Document origin:', document.location.origin);
    
    // Check for service workers
    if ('serviceWorker' in navigator) {
      console.log('🔍 Service Worker detected:', navigator.serviceWorker);
    }
    
    // Check for any global fetch modifications
    console.log('🔍 Native fetch available:', typeof fetch);
    console.log('🔍 XMLHttpRequest available:', typeof XMLHttpRequest);
    
    // Load products from API
    this.apiService.getProducts().subscribe({
      next: (apiProducts: ApiProduct[]) => {
        console.log('✅ API call successful, received products:', apiProducts.length);
        this.products = this.convertApiProductsToProducts(apiProducts);
        this.filteredProducts = this.products;
        this.isLoadingProducts = false;
        this.updateCategoryCounts();
      },
      error: (error: any) => {
        console.error('❌ Error loading products:', error);
        console.error('🔍 Error details:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message
        });
        this.errorMessage = 'Failed to load products. Using mock data.';
        // Fallback to mock data
        this.products = productsMocks.products as Product[];
        this.filteredProducts = this.products;
        this.isLoadingProducts = false;
        this.updateCategoryCounts();
      }
    });

    // Load categories from API
    this.apiService.getCategories().subscribe({
      next: (apiCategories: ApiCategory[]) => {
        this.categories = this.convertApiCategoriesToCategories(apiCategories);
        this.isLoadingCategories = false;
        this.updateCategoryCounts();
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        // Fallback to mock data
        this.categories = productsMocks.categories;
        this.isLoadingCategories = false;
        this.updateCategoryCounts();
      }
    });
  }

  convertApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
    return apiProducts.map(apiProduct => ({
      id: apiProduct.product_id,
      name: [apiProduct.name, apiProduct.name, apiProduct.name], // Same name for all languages for now
      image: apiProduct.image_url || 'default-product.jpg',
      category: apiProduct.subcategory_id.toString(),
      description: ['', '', ''], // No description from API yet
      prices: [
        { 
          market: 'Agrohub', 
          price: 0, // Will be populated when we get prices
          discount: 0, 
          history: [0] 
        }
      ],
      reviews: [],
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    }));
  }

  convertApiCategoriesToCategories(apiCategories: ApiCategory[]): any[] {
    return apiCategories.map(apiCategory => ({
      id: apiCategory.id.toString(),
      name: [apiCategory.name_ka, apiCategory.name_en, apiCategory.name_ru],
      icon: apiCategory.icon || 'default-category.jpg'
    }));
  }

  updateCategoryCounts() {
    this.allCategories = this.categories.map((category) => ({
      ...category,
      productCount: this.products.filter((p) => p.category === category.id)
        .length,
    }));

    this.filteredModalCategories = [...this.allCategories];
  }
  filterModalCategories() {
    const searchTerm = this.modalSearchTerm.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredModalCategories = [...this.allCategories];
      return;
    }

    // Find categories where either:
    // 1. The category name matches in any language
    // 2. The category contains products with matching names
    this.filteredModalCategories = this.allCategories.filter((category) => {
      // Check category name match
      const categoryNameMatch = category.name.some((name: string) =>
        name.toLowerCase().includes(searchTerm)
      );

      // Check if any product in this category matches
      const productMatch = this.products.some(
        (product) =>
          product.category === category.id &&
          product.name.some((name: string) =>
            name.toLowerCase().includes(searchTerm)
          )
      );

      return categoryNameMatch || productMatch;
    });
  }

  searchProducts() {
    if (this.searchTerm.trim()) {
      // Use API search for real-time results
      this.apiService.searchProducts(this.searchTerm).subscribe({
        next: (apiProducts: ApiProduct[]) => {
          this.filteredProducts = this.convertApiProductsToProducts(apiProducts);
          this.applyCategoryFilter();
        },
        error: (error: any) => {
          console.error('Search error:', error);
          // Fallback to local search
          this.performLocalSearch();
        }
      });
    } else {
      // No search term, show all products with category filter
      this.filteredProducts = this.products;
      this.applyCategoryFilter();
    }
  }

  performLocalSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product: Product) => {
      const nameMatch = product.name.some((name: string) =>
        name.toLowerCase().includes(searchTermLower)
      );
      // Filter by multiple categories if any are selected
      const categoryMatch =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category);
      return nameMatch && categoryMatch;
    });
  }

  applyCategoryFilter() {
    if (this.selectedCategories.length > 0) {
      this.filteredProducts = this.filteredProducts.filter((product: Product) =>
        this.selectedCategories.includes(product.category)
      );
    }
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  getLowestPrice(product: Product) {
    const prices = product.prices.map((p) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market?.market || '' };
  }

  addToCart(product: Product, event: MouseEvent) {
    this.cartService.addToCartWithAnimation(product, event);
  }

  // --- Modal Logic ---
  openCategoryModal() {
    this.tempSelectedCategories = [...this.selectedCategories];
    this.modalSearchTerm = '';
    this.filteredModalCategories = [...this.allCategories];
    this.showCategoryModal = true;
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
  }

  onCategoryCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const categoryId = checkbox.value;
    if (checkbox.checked) {
      this.tempSelectedCategories.push(categoryId);
    } else {
      this.tempSelectedCategories = this.tempSelectedCategories.filter(
        (id) => id !== categoryId
      );
    }
  }

  applyCategoryFilters() {
    this.selectedCategories = [...this.tempSelectedCategories]; // Apply temp selections
    this.searchProducts();
    this.closeCategoryModal();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategories = []; // Clear all selected categories
    this.filteredProducts = this.products;
    this.closeCategoryModal(); // Ensure modal is closed if open
  }
  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? this.getCurrentText(category.name) : '';
  }

  removeCategory(categoryId: string): void {
    this.selectedCategories = this.selectedCategories.filter(
      (id) => id !== categoryId
    );
    this.searchProducts(); // Update the filtered products
  }
  getProductsInCategoryCount(categoryId: string): number {
    if (!this.modalSearchTerm) {
      return this.products.filter((p) => p.category === categoryId).length;
    }

    const searchTerm = this.modalSearchTerm.toLowerCase();
    return this.products.filter(
      (p) =>
        p.category === categoryId &&
        p.name.some((name) => name.toLowerCase().includes(searchTerm))
    ).length;
  }
  
}
