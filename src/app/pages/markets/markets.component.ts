// pages/markets/markets.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { marketsMocks } from '../../core/mocks/markets.mocks';

@Component({
  selector: 'app-markets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent {
  mocks = marketsMocks;
  selectedCity = 0;
  Math = Math; // Expose Math to template

  constructor(public languageService: LanguageService) {}

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
  
}