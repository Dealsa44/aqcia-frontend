// pages/markets/markets.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { AuthService } from '../../core/services/auth.service';
import { marketDetailsMocks } from '../../core/mocks/market-details.mocks';
import { ApiService, ApiStore } from '../../core/services/api.service';

@Component({
  selector: 'app-markets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent implements OnInit {
  marketDetailsMocks = marketDetailsMocks;
  mocks = marketsMocks;
  selectedCity = 0;
  Math = Math; // Expose Math to template
  favoriteStores: string[] = [];
  
  // Real API data
  stores: ApiStore[] = [];
  isLoadingStores = true;
  storesError = '';

  constructor(
    public languageService: LanguageService,
    public router: Router,
    public authService: AuthService,
    private apiService: ApiService
  ) {
    console.log('🏪 MarketsComponent initialized');
    this.loadFavoriteStores();
  }

  ngOnInit() {
    console.log('🏪 MarketsComponent - ngOnInit called');
    this.loadStores();
  }

  loadStores() {
    console.log('🏪 MarketsComponent - loadStores called');
    this.isLoadingStores = true;
    this.storesError = '';

    this.apiService.getStores().subscribe({
      next: (apiStores: ApiStore[]) => {
        console.log('✅ MarketsComponent - Stores loaded successfully:', apiStores.length);
        this.stores = apiStores;
        this.isLoadingStores = false;
      },
      error: (error) => {
        console.error('❌ MarketsComponent - Error loading stores:', error);
        this.storesError = 'Failed to load stores. Using mock data.';
        this.isLoadingStores = false;
        // Fallback to mock data
        this.stores = this.convertMocksToApiStores();
      }
    });
  }

  convertMocksToApiStores(): ApiStore[] {
    console.log('🔄 MarketsComponent - Converting mocks to API stores');
    return this.mocks.stores.map((mock: any, index: number) => ({
      id: index + 1,
      name: mock.name[0], // Take first language
      address: mock.address[0], // Take first language
      latitude: mock.latitude || 0,
      longitude: mock.longitude || 0,
      phone: mock.phone || '',
      email: mock.email || '',
      website: mock.website || '',
      opening_hours: mock.opening_hours || '9:00-21:00'
    }));
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  selectCity(index: number) {
    this.selectedCity = index;
  }

  // Helper method to get star rating
  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating));
  }
  viewStore(marketName: string) {
    this.router.navigate([
      '/',
      this.languageService.getCurrentLanguageCode(),
      'market-details',
      marketName.toLowerCase(),
    ]);
  }

  loadFavoriteStores() {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getCurrentUser();
      const userData = localStorage.getItem('user_' + user.id);
      if (userData) {
        const data = JSON.parse(userData);
        this.favoriteStores = data.favoriteStores || [];
      }
    }
  }

  isFavorite(storeName: string): boolean {
    return this.favoriteStores.includes(storeName.toLowerCase());
  }

  toggleFavorite(storeName: string) {
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

    const storeLower = storeName.toLowerCase();
    const index = this.favoriteStores.indexOf(storeLower);

    if (index > -1) {
      this.favoriteStores.splice(index, 1);
    } else {
      this.favoriteStores.push(storeLower);
    }

    data.favoriteStores = this.favoriteStores;
    localStorage.setItem('user_' + user.id, JSON.stringify(data));
  }
}
