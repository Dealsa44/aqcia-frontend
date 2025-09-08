import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  }

  // Get all products
  getProducts(skip: number = 0, limit: number = 100): Observable<ApiProduct[]> {
    const url = `${this.baseUrl}/products?skip=${skip}&limit=${limit}`;
    console.log('🔍 API Service - getProducts called');
    console.log('📍 Base URL:', this.baseUrl);
    console.log('🌐 Full URL:', url);
    console.log('🔒 URL starts with https:', url.startsWith('https://'));
    
    // Add timeout and more detailed logging
    return this.http.get<ApiProduct[]>(url).pipe(
      timeout(10000), // 10 second timeout
      tap({
        next: (data) => console.log('✅ HTTP request successful, received data:', data),
        error: (error) => console.log('❌ HTTP request failed:', error),
        complete: () => console.log('🏁 HTTP request completed')
      })
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
