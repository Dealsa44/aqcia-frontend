// pages/market-details/market-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { marketDetailsMocks } from '../../core/mocks/market-details.mocks';
import { productsMocks } from '../../core/mocks/products.mocks';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { CartService } from '../../core/services/cart.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService, ApiCategory, ApiProduct } from '../../core/services/api.service';

@Component({
  selector: 'app-market-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.scss'],
})
export class MarketDetailsComponent implements OnInit {
  marketId: string = '';
  market: any;
  marketData = marketDetailsMocks;
  featuredProducts: any[] = [];
  categories: any[] = [];
  averagePrice: number = 0;
  priceRange: string = '';
  discountCount: number = 0;
  isFavorite = false;

  // Real API data for Agrohub
  apiCategories: ApiCategory[] = [];
  apiProducts: ApiProduct[] = [];
  isLoadingCategories = true;
  isLoadingProducts = true;
  categoriesError = '';
  productsError = '';

  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private router: Router,
    public cartService: CartService,
    public authService: AuthService,
    private apiService: ApiService
  ) {
    console.log('🏪 MarketDetailsComponent initialized');
    this.route.params.subscribe((params) => {
      this.marketId = params['id'];
      console.log('🏪 MarketDetailsComponent - Market ID:', this.marketId);
      this.loadMarketData();
    });
    this.checkFavoriteStatus();
  }

  ngOnInit() {
    console.log('🏪 MarketDetailsComponent - ngOnInit called');
  }

  loadMarketData() {
    console.log('🏪 MarketDetailsComponent - loadMarketData called for:', this.marketId);
    
    if (this.marketId.toLowerCase() === 'agrohub') {
      // Load real Agrohub data
      this.loadAgrohubData();
    } else {
      // Load mock data for other markets
      this.loadMockMarketData();
    }
  }

  loadAgrohubData() {
    console.log('🏪 MarketDetailsComponent - Loading Agrohub data');
    
    // Set Agrohub market info
    this.market = {
      name: ['Agrohub', 'Agrohub', 'Agrohub'],
      image: 'https://static.agrohub.lemon.do/Agrohub_files/logo.png',
      rating: 4.8,
      delivery: true,
      locations: 15,
      address: ['Tbilisi, Georgia', 'თბილისი, საქართველო', 'Тбилиси, Грузия']
    };

    // Load real categories and products
    this.loadAgrohubCategories();
    this.loadAgrohubProducts();
    this.calculateMarketStats();
  }

  loadMockMarketData() {
    console.log('🏪 MarketDetailsComponent - Loading mock market data');
    
    this.market = marketsMocks.stores.find(
      (store) => store.name[0].toLowerCase() === this.marketId.toLowerCase()
    );

    if (!this.market) {
      this.router.navigate([
        '/',
        this.languageService.getCurrentLanguageCode(),
        'markets',
      ]);
      return;
    }

    // Get unique categories for this market
    const marketProducts = productsMocks.products.filter((product) =>
      product.prices.some(
        (price) => price.market.toLowerCase() === this.marketId.toLowerCase()
      )
    );

    // Get featured products (random 4)
    this.featuredProducts = [...marketProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    // Get unique categories
    const categoryIds = [
      ...new Set(marketProducts.map((product) => product.category)),
    ];
    this.categories = productsMocks.categories.filter((category) =>
      categoryIds.includes(category.id)
    );

    // Calculate pricing info
    const prices = marketProducts.flatMap((product) =>
      product.prices
        .filter(
          (price) => price.market.toLowerCase() === this.marketId.toLowerCase()
        )
        .map((price) => price.price - (price.discount || 0))
    );

    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      this.averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
      this.priceRange = `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
      this.discountCount = marketProducts.filter((product) =>
        product.prices.some(
          (price) =>
            price.market.toLowerCase() === this.marketId.toLowerCase() &&
            price.discount > 0
        )
      ).length;
    }
  }

  loadAgrohubCategories() {
    console.log('🏪 MarketDetailsComponent - Loading Agrohub categories');
    this.isLoadingCategories = true;
    this.categoriesError = '';

    this.apiService.getAllCategories().subscribe({
      next: (categories: ApiCategory[]) => {
        console.log('✅ MarketDetailsComponent - Categories loaded:', categories.length);
        this.apiCategories = categories;
        this.categories = categories.map(cat => ({
          id: cat.id,
          name: [cat.name_en, cat.name_ka, cat.name_ru],
          icon: cat.icon,
          productCount: 0 // Will be updated when products load
        }));
        this.isLoadingCategories = false;
      },
      error: (error) => {
        console.error('❌ MarketDetailsComponent - Error loading categories:', error);
        this.categoriesError = 'Failed to load categories.';
        this.isLoadingCategories = false;
      }
    });
  }

  loadAgrohubProducts() {
    console.log('🏪 MarketDetailsComponent - Loading Agrohub products');
    this.isLoadingProducts = true;
    this.productsError = '';

    this.apiService.getProducts(0, 20).subscribe({
      next: (products: ApiProduct[]) => {
        console.log('✅ MarketDetailsComponent - Products loaded:', products.length);
        this.apiProducts = products;
        this.featuredProducts = products.slice(0, 8).map(product => ({
          id: product.product_id,
          name: [product.name, product.name, product.name],
          price: 0, // Will be updated with real prices
          image: product.image_url,
          rating: 4.5,
          discount: 0
        }));
        this.isLoadingProducts = false;
      },
      error: (error) => {
        console.error('❌ MarketDetailsComponent - Error loading products:', error);
        this.productsError = 'Failed to load products.';
        this.isLoadingProducts = false;
      }
    });
  }

  calculateMarketStats() {
    console.log('📊 MarketDetailsComponent - calculateMarketStats called');
    
    if (this.marketId.toLowerCase() === 'agrohub') {
      // Calculate stats for Agrohub using real data
      if (this.apiProducts.length > 0) {
        this.averagePrice = 0; // Will be calculated when prices are loaded
        this.priceRange = 'Loading...';
        this.discountCount = 0;
        console.log('📊 MarketDetailsComponent - Agrohub stats calculated');
      }
    } else {
      // Calculate stats for mock markets
      const marketProducts = productsMocks.products.filter((product) =>
        product.prices.some(
          (price) => price.market.toLowerCase() === this.marketId.toLowerCase()
        )
      );

      const prices = marketProducts.flatMap((product) =>
        product.prices
          .filter(
            (price) => price.market.toLowerCase() === this.marketId.toLowerCase()
          )
          .map((price) => price.price - (price.discount || 0))
      );

      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        this.averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        this.priceRange = `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
        this.discountCount = marketProducts.filter((product) =>
          product.prices.some(
            (price) =>
              price.market.toLowerCase() === this.marketId.toLowerCase() &&
              price.discount > 0
          )
        ).length;
      }
    }
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  addToCart(product: any) {
    const marketPrice = product.prices.find(
      (p: any) => p.market.toLowerCase() === this.marketId.toLowerCase()
    );

    if (marketPrice) {
      this.cartService.addToCart({
        id: product.id,
        name: product.name,
        price: marketPrice.price - (marketPrice.discount || 0),
        image: product.image,
        quantity: 1,
        market: this.marketId,
      });
    }
  }
  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating));
  }

  getMarketPrice(product: any): number {
    const price = product.prices.find(
      (p: any) => p.market.toLowerCase() === this.marketId.toLowerCase()
    );
    return price ? price.price - (price.discount || 0) : 0;
  }

  hasDiscount(product: any): boolean {
    const price = product.prices.find(
      (p: any) => p.market.toLowerCase() === this.marketId.toLowerCase()
    );
    return price ? price.discount > 0 : false;
  }

  getDiscount(product: any): number {
    const price = product.prices.find(
      (p: any) => p.market.toLowerCase() === this.marketId.toLowerCase()
    );
    if (price) {
      const discountPercentage = (price.discount / price.price) * 100;
      // Round up to 2 decimal places
      return Math.ceil(discountPercentage * 100) / 100;
    }
    return 0;
  }
  checkFavoriteStatus() {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      const userData = localStorage.getItem('user_' + user.id);
      if (userData) {
        const data = JSON.parse(userData);
        this.isFavorite = data.favoriteStores?.includes(this.marketId) || false;
      }
    }
  }

  toggleFavorite() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([
        this.languageService.getCurrentLanguageCode(),
        'login',
      ]);
      return;
    }

    const user = this.authService.getCurrentUser();
    const userData = localStorage.getItem('user_' + user.id);
    let data = userData ? JSON.parse(userData) : { favoriteStores: [] };

    if (this.isFavorite) {
      data.favoriteStores = data.favoriteStores.filter(
        (s: string) => s !== this.marketId
      );
    } else {
      if (!data.favoriteStores) data.favoriteStores = [];
      data.favoriteStores.push(this.marketId);
    }

    localStorage.setItem('user_' + user.id, JSON.stringify(data));
    this.isFavorite = !this.isFavorite;
  }
}
