// shared/components/navbar/navbar.component.ts
import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { navbarMocks } from '../../../core/mocks/navbar.mocks';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  @Output() cityChanged = new EventEmitter<string>();

  navData = navbarMocks;
  currentCity = this.navData.cities[0];
  isLanguageOpen = false;
  isCityOpen = false;
  cartItemCount = 0;
  mobileView = true; // Always show mobile layout for mobile app
  showItemDrop = false;
  private cartSubscription: Subscription;
  private previousCartCount = 0;

  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    public cartService: CartService,
    public router: Router
  ) {
    this.cartSubscription = this.cartService.cart$.subscribe(() => {
      const newCount = this.cartService.getTotalItemCount();
      
      // Trigger item drop animation when cart count increases
      if (newCount > this.previousCartCount) {
        this.triggerItemDropAnimation();
      }
      
      this.cartItemCount = newCount;
      this.previousCartCount = newCount;
    });
    // Removed resize listener since we always use mobile layout
  }


  toggleLanguage() {
    this.isLanguageOpen = !this.isLanguageOpen;
  }

  toggleCity() {
    this.isCityOpen = !this.isCityOpen;
  }

  setLanguage(index: number) {
    this.languageService.setLanguage(index);
    this.isLanguageOpen = false;
  }

  selectCity(city: any) {
    this.currentCity = city;
    this.cityChanged.emit(city.name[this.languageService.getCurrentLanguage()]);
    this.isCityOpen = false;
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  getNavItems() {
    return this.navData.items.filter((item) => {
      if (!item.authState) return true;
      return (
        item.authState ===
        (this.authService.isLoggedIn() ? 'loggedIn' : 'loggedOut')
      );
    });
  }

  get showFloatingCart(): boolean {
    return this.mobileView;
  }

  navigateToCart() {
    this.router.navigate([
      '/',
      this.languageService.getCurrentLanguageCode(),
      'cart',
    ]);
  }

  navigateToPage(route: string) {
    const currentUrl = this.router.url;
    const targetUrl = `/${this.languageService.getCurrentLanguageCode()}/${route}`;
    
    if (currentUrl === targetUrl) {
      // If already on the same page, instantly jump to top
      window.scrollTo(0, 0);
    } else {
      // Navigate to the page (app component will handle scroll to top)
      this.router.navigate([targetUrl]);
    }
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
  getTotalPrice(): string {
  const total = this.cartService.getTotalPrice();
  // Format the price based on current language/currency
  // You might want to adjust this based on your actual currency formatting needs
  return `${total.toFixed(2)} ₾`; // Using Georgian Lari symbol as example
}

  triggerItemDropAnimation() {
    this.showItemDrop = true;
    
    // Hide animation after it completes
    setTimeout(() => {
      this.showItemDrop = false;
    }, 1000);
  }

  isProfileActive(): boolean {
    const currentUrl = this.router.url;
    const profileRoutes = ['profile', 'login', 'register', 'forgot-password'];
    return profileRoutes.some(route => currentUrl.includes(route));
  }

  isMarketsActive(): boolean {
    const currentUrl = this.router.url;
    const marketsRoutes = ['markets', 'market-details', 'market-products'];
    return marketsRoutes.some(route => currentUrl.includes(route));
  }

  shouldShowBackButton(): boolean {
    const currentUrl = this.router.url;
    
    // Don't show back button on main pages
    const mainPages = ['catalog', 'cart', 'profile', 'markets'];
    const authPages = ['login', 'register', 'forgot-password'];
    
    // Check if current URL contains any main page or auth page
    const isMainPage = mainPages.some(page => currentUrl.includes(page));
    const isAuthPage = authPages.some(page => currentUrl.includes(page));
    
    // Don't show back button if it's a main page or auth page
    if (isMainPage || isAuthPage) {
      return false;
    }
    
    // Show back button for all other pages (child pages)
    return true;
  }

  goBack() {
    const currentUrl = this.router.url;
    const languageCode = this.languageService.getCurrentLanguageCode();
    
    // Smart back navigation based on current page
    if (currentUrl.includes('market-details')) {
      // From market-details, go back to markets
      this.router.navigate([`/${languageCode}/markets`]);
    } else if (currentUrl.includes('market-products')) {
      // From market-products, go back to market-details
      // Extract market ID from current URL
      const urlParts = currentUrl.split('/');
      const marketProductsIndex = urlParts.findIndex(part => part === 'market-products');
      if (marketProductsIndex > 0) {
        const marketId = urlParts[marketProductsIndex - 1];
        this.router.navigate([`/${languageCode}/market-details/${marketId}`]);
      } else {
        // Fallback to markets if can't determine market ID
        this.router.navigate([`/${languageCode}/markets`]);
      }
    } else if (currentUrl.includes('product')) {
      // From product page, check referrer or go to catalog
      const referrer = document.referrer;
      if (referrer.includes('market-products')) {
        // Came from market-products, go back there
        const referrerParts = referrer.split('/');
        const marketProductsIndex = referrerParts.findIndex(part => part === 'market-products');
        if (marketProductsIndex > 0) {
          const marketId = referrerParts[marketProductsIndex - 1];
          this.router.navigate([`/${languageCode}/market-products/${marketId}`]);
        } else {
          this.router.navigate([`/${languageCode}/catalog`]);
        }
      } else if (referrer.includes('catalog')) {
        // Came from catalog, go back there
        this.router.navigate([`/${languageCode}/catalog`]);
      } else {
        // Default to catalog
        this.router.navigate([`/${languageCode}/catalog`]);
      }
    } else {
      // Default fallback - go to catalog
      this.router.navigate([`/${languageCode}/catalog`]);
    }
  }
}
