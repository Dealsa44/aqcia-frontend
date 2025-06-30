// pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { FormsModule } from '@angular/forms';
import { homeMocks } from '../../core/mocks/home.mocks'; // Import the new mocks

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchTerm = '';
  homeData = homeMocks; // Assign the mocks to a property

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(
        ['/', this.languageService.getCurrentLanguageCode(), 'search'],
        {
          queryParams: { q: this.searchTerm },
          queryParamsHandling: 'merge', // Preserve other query params if any
        }
      );
    }
  }
}