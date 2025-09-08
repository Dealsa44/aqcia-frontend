// pages/catalog/catalog.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { catalogMocks } from '../../core/mocks/catalog.mocks';
import { CartService } from '../../core/services/cart.service';
import { ApiService, BackendProduct, BackendCategory } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/interfaces/product.interface';
import { ProductAnimationService } from '../../core/services/product-animation.service';

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
  products: Product[] = []; // Will be loaded from API
  categories: any[] = []; // Will be loaded from API
  filteredProducts: Product[] = [];

  showCategoryModal = false;
  selectedCategories: string[] = []; // New property to store multiple selected categories
  tempSelectedCategories: string[] = []; // Temporary storage for selections in modal

  modalSearchTerm = '';
  filteredModalCategories: any[] = [];
  allCategories: any[] = [];

  // Loading states
  isLoadingProducts = false;
  isLoadingCategories = false;
  apiError = '';

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
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoadingProducts = true;
    this.apiError = '';
    
    this.apiService.getProducts().subscribe({
      next: (backendProducts: BackendProduct[]) => {
        // Transform backend products to frontend format
        this.products = this.transformBackendProducts(backendProducts);
        this.filteredProducts = [...this.products];
        this.isLoadingProducts = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.apiError = 'Failed to load products. Using mock data.';
        // Fallback to mock data
        this.products = productsMocks.products as Product[];
        this.filteredProducts = [...this.products];
        this.isLoadingProducts = false;
      }
    });
  }

  loadCategories() {
    this.isLoadingCategories = true;
    
    this.apiService.getCategories().subscribe({
      next: (backendCategories: BackendCategory[]) => {
        // Transform backend categories to frontend format
        this.categories = this.transformBackendCategories(backendCategories);
        this.updateAllCategories();
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        // Fallback to mock categories
        this.categories = productsMocks.categories;
        this.updateAllCategories();
        this.isLoadingCategories = false;
      }
    });
  }

  updateAllCategories() {
    this.allCategories = this.categories.map((category) => ({
      ...category,
      productCount: this.products.filter((p) => p.category === category.id)
        .length,
    }));

    this.filteredModalCategories = [...this.allCategories];
  }

  transformBackendProducts(backendProducts: BackendProduct[]): Product[] {
    return backendProducts.map(product => ({
      id: product.product_id,
      name: [product.name, product.name, product.name], // Same name for all languages for now
      image: product.image_url || 'default-product.jpg',
      category: product.subcategory_id?.toString() || 'uncategorized',
      description: ['No description available', 'No description available', 'No description available'],
      prices: [
        { market: 'Unknown Store', price: 0, discount: 0, history: [0] }
      ],
      reviews: [],
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    }));
  }

  transformBackendCategories(backendCategories: BackendCategory[]): any[] {
    return backendCategories.map(category => ({
      id: category.id.toString(),
      name: [
        category.name_ka || category.name,
        category.name_en || category.name,
        category.name_ru || category.name
      ],
      icon: category.icon || 'default-category.jpg'
    }));
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
      // Use API search for better results
      this.isLoadingProducts = true;
      this.apiService.searchProducts(this.searchTerm).subscribe({
        next: (backendProducts: BackendProduct[]) => {
          this.products = this.transformBackendProducts(backendProducts);
          this.applyCategoryFilter();
          this.isLoadingProducts = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          // Fallback to local search
          this.performLocalSearch();
          this.isLoadingProducts = false;
        }
      });
    } else {
      // No search term, load all products
      this.loadProducts();
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
    this.filteredProducts = this.products.filter((product: Product) => {
      const categoryMatch =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category);
      return categoryMatch;
    });
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
    this.loadProducts(); // Reload all products
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
