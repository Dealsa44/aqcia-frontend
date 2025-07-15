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
  isMenuOpen = false;
  isLanguageOpen = false;
  isCityOpen = false;
  isSticky = false;
  cartItemCount = 0;
  private cartSubscription: Subscription;
  mobileView = window.innerWidth <= 992; // Initialize based on current width
  private resizeSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    public cartService: CartService,
    public router: Router
  ) {
    this.cartSubscription = this.cartService.cart$.subscribe(() => {
      this.cartItemCount = this.cartService.getTotalItemCount();
    });
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(100) // Debounce to avoid excessive checks
      )
      .subscribe(() => {
        this.mobileView = window.innerWidth <= 992;
      });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset > 0;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
}
