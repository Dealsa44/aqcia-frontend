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
  isInitialLoad = true; // Track if this is the initial load

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
  ) {
    // Add mobile-specific error recovery
    this.setupMobileErrorRecovery();
  }

  private setupMobileErrorRecovery() {
    // Add a global error handler for mobile browsers
    window.addEventListener('error', (event) => {
      if (this.isInitialLoad && event.error?.message?.includes('fetch')) {
        console.log('🔄 Mobile browser fetch error detected, attempting recovery...');
        // Try to reload data after a short delay
        setTimeout(() => {
          if (this.isInitialLoad) {
            console.log('🔄 Attempting to reload data...');
            this.loadData();
          }
        }, 3000);
      }
    });

    // iOS-specific error handling for Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('🚨 Unhandled promise rejection on iOS:', event.reason);
      // Prevent the default behavior to avoid crashes
      event.preventDefault();
      
      // If it's during initial load, try to recover
      if (this.isInitialLoad && event.reason?.message?.includes('fetch')) {
        console.log('🔄 iOS Promise rejection detected, attempting recovery...');
        setTimeout(() => {
          if (this.isInitialLoad) {
            this.loadData();
          }
        }, 2000);
      }
    });
  }

  ngOnInit() {
    // Scroll to top when component initializes
    window.scrollTo(0, 0);
    
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
    console.log('🔄 CatalogComponent - Starting data load...');
    
    // Load categories first, then products to avoid simultaneous requests on mobile
    this.loadCategories();
  }

  private loadCategories() {
    console.log('🔄 CatalogComponent - Loading categories...');
    this.apiService.getAllCategories().subscribe({
      next: (apiCategories: ApiCategory[]) => {
        console.log('✅ CatalogComponent - Categories loaded successfully:', apiCategories.length);
        this.categories = this.convertApiCategoriesToCategories(apiCategories);
        this.isLoadingCategories = false;
        this.updateCategoryCounts();
        
        // Load products after categories are loaded
        this.loadProducts();
      },
      error: (error: any) => {
        console.error('❌ CatalogComponent - Error loading categories:', error);
        // Fallback to mock data
        this.categories = productsMocks.categories;
        this.isLoadingCategories = false;
        this.updateCategoryCounts();
        
        // Still try to load products even if categories fail
        this.loadProducts();
      }
    });
  }

  private loadProducts() {
    console.log('🔄 CatalogComponent - Loading products...');
    this.apiService.getProducts().subscribe({
      next: (apiProducts: ApiProduct[]) => {
        console.log('✅ CatalogComponent - Products loaded successfully:', apiProducts.length);
        this.products = this.convertApiProductsToProducts(apiProducts);
        this.filteredProducts = this.products;
        this.isLoadingProducts = false;
        this.isInitialLoad = false;
        this.updateCategoryCounts();
      },
      error: (error: any) => {
        console.error('❌ CatalogComponent - Error loading products:', error);
        
        // Enhanced error handling for mobile browsers
        if (error.status === 0) {
          this.errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.status === 403) {
          this.errorMessage = 'Access denied. Please try refreshing the page.';
        } else if (error.status >= 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Failed to load products. Using mock data.';
        }
        
        // Fallback to mock data
        this.products = productsMocks.products as Product[];
        this.filteredProducts = this.products;
        this.isLoadingProducts = false;
        this.isInitialLoad = false;
        this.updateCategoryCounts();
      }
    });
  }

  convertApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
    return apiProducts.map(apiProduct => ({
      id: apiProduct.product_id,
      name: [apiProduct.name, apiProduct.name, apiProduct.name], // Same name for all languages for now
      image: apiProduct.image_url || 'default-product.jpg',
      category: this.mapSubcategoryToCategory(apiProduct.subcategory_id),
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

  mapSubcategoryToCategory(subcategoryId: number): string {
    // Simple mapping from subcategory to main category
    // This should be improved with proper API data
    const categoryMap: { [key: number]: string } = {
      2: '1',   // Spices -> Food
      3: '1',   // Sauces -> Food
      4: '1',   // Dairy -> Food
      6: '1',   // Pickles -> Food
      7: '1',   // Spices -> Food
      8: '1',   // Juices -> Food
      9: '1',   // Capers -> Food
      10: '2',  // Kitchenware -> Household
      16: '1',  // Salads -> Food
      24: '1',  // Bread -> Food
      25: '1',  // Baguettes -> Food
      26: '1',  // Toast bread -> Food
      34: '1',  // Meat -> Food
      35: '1',  // Vegetables -> Food
      36: '1',  // Fruits -> Food
      37: '1',  // Herbs -> Food
      41: '1',  // Meat -> Food
      42: '1',  // Meat -> Food
      46: '1',  // Fish -> Food
      47: '1',  // Sausages -> Food
      49: '1',  // Cheese -> Food
      51: '1',  // Cheese -> Food
      52: '1',  // Cheese -> Food
      56: '1'   // Mayonnaise -> Food
    };
    
    return categoryMap[subcategoryId] || '1'; // Default to Food category
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

  // TrackBy function for *ngFor to improve iOS performance
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  trackByCategoryId(index: number, category: any): string {
    return category.id;
  }
  
}
