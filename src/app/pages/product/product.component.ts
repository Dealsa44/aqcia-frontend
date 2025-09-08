// pages/product/product.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { productMocks } from '../../core/mocks/product.mock';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { ApiService, ApiProduct, ApiPrice } from '../../core/services/api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;
  currentImageIndex = 0;
  productData = productMocks;
  
  // Real API data
  apiProduct: ApiProduct | null = null;
  prices: ApiPrice[] = [];
  isLoadingProduct = true;
  isLoadingPrices = true;
  productError = '';
  pricesError = '';

  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService,
    public cartService: CartService,
    private apiService: ApiService
  ) {
    console.log('🛍️ ProductComponent initialized');
  }

  ngOnInit() {
    console.log('🛍️ ProductComponent - ngOnInit called');
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      console.log('🛍️ ProductComponent - Loading product ID:', productId);
      
      // Load from API
      this.loadProduct(productId);
      
      // Fallback to mock
      this.product = productsMocks.products.find(p => p.id === productId);
    });
  }

  loadProduct(productId: number) {
    console.log('🛍️ ProductComponent - loadProduct called for ID:', productId);
    this.isLoadingProduct = true;
    this.productError = '';

    // Try to load from API first
    this.apiService.getProduct(productId).subscribe({
      next: (apiProduct: ApiProduct) => {
        console.log('✅ ProductComponent - Product loaded successfully from API:', apiProduct);
        this.apiProduct = apiProduct;
        this.product = this.convertApiProductToProduct(apiProduct);
        this.isLoadingProduct = false;
        this.loadPrices(productId);
      },
      error: (error) => {
        console.error('❌ ProductComponent - Error loading product from API:', error);
        console.log('🔄 ProductComponent - Falling back to mock data');
        
        // Fallback to mock data
        this.product = productsMocks.products.find(p => p.id === productId);
        if (!this.product) {
          this.productError = 'Product not found.';
        }
        this.isLoadingProduct = false;
      }
    });
  }

  convertApiProductToProduct(apiProduct: ApiProduct): any {
    console.log('🔄 ProductComponent - Converting API product to display format');
    return {
      id: apiProduct.product_id,
      name: [apiProduct.name, apiProduct.name, apiProduct.name], // Multi-language array
      description: ['', '', ''], // No description available from API
      image: apiProduct.image_url,
      images: [apiProduct.image_url], // Single image for now
      prices: [], // Will be populated by loadPrices
      rating: 4.5, // Default rating
      discount: 0, // Will be calculated from prices
      brand: apiProduct.brand || '',
      barcode: apiProduct.bar_code || '',
      subcategory_id: apiProduct.subcategory_id
    };
  }

  loadPrices(productId: number) {
    console.log('💰 ProductComponent - loadPrices called for product ID:', productId);
    this.isLoadingPrices = true;
    this.pricesError = '';

    this.apiService.getProductPrices(productId).subscribe({
      next: (apiPrices: ApiPrice[]) => {
        console.log('✅ ProductComponent - Prices loaded successfully:', apiPrices.length);
        this.prices = apiPrices;
        this.isLoadingPrices = false;
      },
      error: (error) => {
        console.error('❌ ProductComponent - Error loading prices:', error);
        this.pricesError = 'Failed to load prices.';
        this.isLoadingPrices = false;
      }
    });
  }

  getCurrentText(items: string[] | any[]) {
    if (Array.isArray(items)) {
        return items[this.languageService.getCurrentLanguage()];
    }
    return items;
  }

  getLowestPrice(product: any) {
    const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p: any) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market.market };
  }

  addToCart(product: any, event?: MouseEvent) {
    this.cartService.addToCartWithAnimation({
      id: product.id,
      name: product.name, // Keep as array for language handling
      price: this.getLowestPrice(product).price,
      image: product.image,
      quantity: 1
    }, event);
  }
}