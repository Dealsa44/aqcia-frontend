// pages/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { profileMocks } from '../../core/mocks/profile.mocks';
import { productsMocks } from '../../core/mocks/products.mocks';
import { cartMocks } from '../../core/mocks/cart.mocks';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  cartMocks = cartMocks;
  profileMocks = profileMocks;
  profileData: any = {};
  editMode = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  favoriteStores: any[] = [];
  recentSearches: string[] = [];

  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    public cartService: CartService,
    private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate([this.languageService.getCurrentLanguageCode(), 'login']);
    } else {
      this.profileData = { ...this.authService.getCurrentUser() };
      // Load favorite stores and recent searches from localStorage
      this.loadUserData();
    }
  }

  ngOnInit() {
    // Scroll to top when component initializes
    window.scrollTo(0, 0);
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  loadUserData() {
    const userData = localStorage.getItem('user_' + this.profileData.id);
    if (userData) {
      const data = JSON.parse(userData);
      this.favoriteStores = data.favoriteStores || [];
      this.recentSearches = data.recentSearches || [];
    }
  }

  saveUserData() {
    localStorage.setItem(
      'user_' + this.profileData.id,
      JSON.stringify({
        favoriteStores: this.favoriteStores,
        recentSearches: this.recentSearches,
      })
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      // Reset to original data when canceling edit
      this.profileData = { ...this.authService.getCurrentUser() };
    }
  }

  saveProfile() {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.authService.updateProfile(this.profileData)) {
      this.successMessage = this.getCurrentText(profileMocks.profileUpdated);
      this.editMode = false;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      this.errorMessage = this.getCurrentText(profileMocks.updateError);
    }

    this.isLoading = false;
  }

  logout() {
    this.authService.logout();
  }

  removeFavoriteStore(storeName: string) {
    this.favoriteStores = this.favoriteStores.filter((store) => store !== storeName);
    this.saveUserData();
  }

  getCartTotalItems(): number {
    return this.cartService.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotalPrice(): number {
    return this.cartService.getCartItems().reduce((total, item) => {
      const product = productsMocks.products.find((p) => p.id === item.id);
      return total + (product ? this.getLowestPrice(product).price * item.quantity : 0);
    }, 0);
  }

  getLowestPrice(product: any) {
    const prices = product.prices.map((p: any) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p: any) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market?.market || '' };
  }

  /**
   * Navigates to the market details page for the given store.
   * @param storeName The name of the store to view.
   */
  viewStore(storeName: string) {
    this.router.navigate([
      '/',
      this.languageService.getCurrentLanguageCode(),
      'market-details',
      storeName.toLowerCase(),
    ]);
  }
}