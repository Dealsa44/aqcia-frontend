// shared/components/navbar/navbar.component.ts
import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { navbarMocks } from '../../../core/mocks/navbar.mocks';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() cityChanged = new EventEmitter<string>();
  
  navData = navbarMocks;
  currentCity = this.navData.cities[0];
  isMenuOpen = false;
  isLanguageOpen = false;
  isCityOpen = false;
  isSticky = false;

  constructor(public languageService: LanguageService) {}


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
}