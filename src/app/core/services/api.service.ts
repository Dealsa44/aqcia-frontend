import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface ApiProduct {
  product_id: number;
  name: string;
  brand: string;
  api_product_id: number;
  bar_code: string;
  image_url: string;
  subcategory_id: number;
}

export interface ApiCategory {
  id: number;
  name: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  icon: string;
  api_category_id: number;
}

export interface ApiSubcategory {
  id: number;
  name: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  icon: string;
  api_subcategory_id: number;
  category_id: number;
}

export interface ApiPrice {
  price_id: number;
  store_id: number;
  product_id: number;
  price: number;
  sale_price: number;
  is_on_sale: boolean;
  sale_start: string;
  sale_end: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://aqcia-api-g2afh7hcdvdffsg5.northeurope-01.azurewebsites.net';

  constructor(private http: HttpClient) {
    console.log('🚀 API Service initialized');
    console.log('📍 Base URL set to:', this.baseUrl);
    console.log('🔒 Base URL is HTTPS:', this.baseUrl.startsWith('https://'));
    console.log('🌐 Window location:', window.location.href);
    console.log('🔒 Window protocol:', window.location.protocol);
    console.log('🏠 Window origin:', window.location.origin);
    console.log('🔍 Environment check:', typeof window !== 'undefined' ? 'Browser' : 'Server');
  }

  // Get all products
  getProducts(skip: number = 0, limit: number = 100): Observable<ApiProduct[]> {
    const timestamp = Date.now();
    const url = `${this.baseUrl}/products/?skip=${skip}&limit=${limit}&v=${timestamp}`;
    
    console.log('🔍 API Service - getProducts called');
    console.log('📍 Base URL:', this.baseUrl);
    console.log('🌐 Full URL:', url);
    console.log('🔒 URL starts with https:', url.startsWith('https://'));
    console.log('🔍 URL analysis:', {
      fullUrl: url,
      baseUrl: this.baseUrl,
      isHttps: url.startsWith('https://'),
      protocol: url.split('://')[0],
      host: url.split('://')[1]?.split('/')[0]
    });
    
    // Check if there are any redirects or modifications
    console.log('🔍 HTTP Client configuration check:');
    console.log('🔍 HttpClient instance:', this.http);
    console.log('🔍 Request options:', {
      observe: 'response',
      reportProgress: true
    });
    
    // Add comprehensive error handling and logging
    return this.http.get<ApiProduct[]>(url, {
      observe: 'response',
      reportProgress: true
    }).pipe(
      timeout(15000), // 15 second timeout
      tap({
        next: (response) => {
          console.log('✅ HTTP request successful!');
          console.log('📊 Response status:', response.status);
          console.log('📋 Response headers:', response.headers);
          console.log('📦 Response body length:', response.body?.length || 0);
          console.log('🔍 First few items:', response.body?.slice(0, 3));
        },
        error: (error) => {
          console.log('❌ HTTP request failed!');
          console.log('🚨 Error type:', error.constructor.name);
          console.log('📊 Error status:', error.status);
          console.log('📋 Error statusText:', error.statusText);
          console.log('🌐 Error URL:', error.url);
          console.log('📝 Error message:', error.message);
          console.log('🔍 Full error object:', error);
          
          // Check if it's a network error
          if (error.status === 0) {
            console.log('🌐 Network error detected - possible CORS or connectivity issue');
          }
          
          // Check if it's a timeout
          if (error.name === 'TimeoutError') {
            console.log('⏰ Request timed out after 15 seconds');
          }
        },
        complete: () => console.log('🏁 HTTP request completed')
      }),
      map(response => response.body || [])
    );
  }

  // Get all categories
  getCategories(): Observable<ApiCategory[]> {
    return this.http.get<ApiCategory[]>(`${this.baseUrl}/catalog/categories/v2`);
  }

  // Get all subcategories
  getSubcategories(): Observable<ApiSubcategory[]> {
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/subcategories`);
  }

  // Search products
  searchProducts(query: string): Observable<ApiProduct[]> {
    return this.http.get<ApiProduct[]>(`${this.baseUrl}/search?q=${query}`);
  }

  // Get product by ID
  getProduct(id: number): Observable<ApiProduct> {
    return this.http.get<ApiProduct>(`${this.baseUrl}/products/${id}`);
  }

  // Get prices for a product
  getProductPrices(productId: number): Observable<ApiPrice[]> {
    return this.http.get<ApiPrice[]>(`${this.baseUrl}/prices/product/${productId}`);
  }

  // Get subcategories for a category
  getSubcategoriesForCategory(categoryId: number): Observable<ApiSubcategory[]> {
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/categories/${categoryId}/subcategories`);
  }
}
