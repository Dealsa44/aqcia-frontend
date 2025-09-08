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
  isSticky = false;
  cartItemCount = 0;
  showItemDrop = false;
  private cartSubscription: Subscription;
  mobileView = window.innerWidth < 768; // Mobile-first: mobile below 768px
  private resizeSubscription: Subscription;
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
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100) // Debounce to avoid excessive checks
      )
      .subscribe(() => {
        this.mobileView = window.innerWidth < 768;
      });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset > 0;
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
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.resizeSubscription?.unsubscribe();
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
}
