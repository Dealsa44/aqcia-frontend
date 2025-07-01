// pages/markets/markets.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { marketsMocks } from '../../core/mocks/markets.mocks';
import { AuthService } from '../../core/services/auth.service';
import { marketDetailsMocks } from '../../core/mocks/market-details.mocks';

@Component({
  selector: 'app-markets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent {
  marketDetailsMocks = marketDetailsMocks;
  mocks = marketsMocks;
  selectedCity = 0;
  Math = Math; // Expose Math to template
  favoriteStores: string[] = [];

  constructor(
    public languageService: LanguageService,
    public router: Router,
    public authService: AuthService
  ) {
    this.loadFavoriteStores();
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
