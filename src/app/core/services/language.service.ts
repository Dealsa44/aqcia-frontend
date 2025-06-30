import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguageIndex';
  private languageMap: { [key: string]: number } = {
    'ka': 0,
    'en': 1,
    'ru': 2
  };
  private indexToCode: { [key: number]: string } = {
    0: 'ka',
    1: 'en',
    2: 'ru'
  };

  private currentLanguageIndex = this.getSavedLanguageIndex();
  public currentLanguage$ = new BehaviorSubject<number>(this.currentLanguageIndex);

   constructor(private router: Router) {
    // Initialize language from URL if present
    this.initializeLanguageFromUrl();
  }

  private initializeLanguageFromUrl(): void {
    const urlLang = this.router.url.split('/')[1];
    if (urlLang && this.languageMap[urlLang] !== undefined) {
      this.setLanguage(this.languageMap[urlLang]);
    }
  }

  private getSavedLanguageIndex(): number {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved !== null ? +saved : 1; // default to English (1) if not found
  }

  getCurrentLanguage(): number {
    return this.currentLanguageIndex;
  }

  getCurrentLanguageCode(): string {
    return this.indexToCode[this.currentLanguageIndex];
  }

  setLanguage(index: number): void {
    this.currentLanguageIndex = index;
    localStorage.setItem(this.STORAGE_KEY, index.toString());
    this.currentLanguage$.next(index);
    
    // Update URL
    const langCode = this.indexToCode[index];
    const currentUrl = this.router.url;
    const newUrl = this.updateUrlLanguage(currentUrl, langCode);
    this.router.navigateByUrl(newUrl);
  }

  setLanguageFromCode(code: string): void {
    const index = this.languageMap[code];
    if (index !== undefined) {
      this.setLanguage(index);
    }
  }

  private updateUrlLanguage(url: string, langCode: string): string {
    const parts = url.split('/').filter(part => part !== '');
    
    // If URL already has a language code, replace it
    if (parts.length > 0 && this.languageMap[parts[0]] !== undefined) {
      parts[0] = langCode;
      return '/' + parts.join('/');
    }
    
    // Otherwise, prepend the language code
    return '/' + langCode + url;
  }

  getNextLanguage(): number {
    const nextIndex = (this.currentLanguageIndex + 1) % 3;
    this.setLanguage(nextIndex);
    return nextIndex;
  }
}