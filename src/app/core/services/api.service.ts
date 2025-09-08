import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(skip: number = 0, limit: number = 100): Observable<ApiProduct[]> {
    return this.http.get<ApiProduct[]>(`${this.baseUrl}/products?skip=${skip}&limit=${limit}`);
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
