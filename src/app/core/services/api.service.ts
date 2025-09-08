import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BackendProduct {
  product_id: number;
  name: string;
  brand?: string;
  image_url?: string;
  subcategory_id?: number;
}

export interface BackendCategory {
  id: number;
  name: string;
  name_ka?: string;
  name_en?: string;
  name_ru?: string;
  icon?: string;
}

export interface BackendPrice {
  price_id: number;
  store_id: number;
  product_id: number;
  price: number;
  sale_price?: number;
  is_on_sale: boolean;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Product methods
  getProducts(skip: number = 0, limit: number = 100): Observable<BackendProduct[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    return this.http.get<BackendProduct[]>(`${this.apiUrl}/products`, { params });
  }

  getProduct(id: number): Observable<BackendProduct> {
    return this.http.get<BackendProduct>(`${this.apiUrl}/products/${id}`);
  }

  // Category methods
  getCategories(): Observable<BackendCategory[]> {
    return this.http.get<BackendCategory[]>(`${this.apiUrl}/catalog/categories/v2`);
  }

  getSubcategories(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/catalog/categories/${categoryId}/subcategories`);
  }

  // Search method
  searchProducts(query: string): Observable<BackendProduct[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<BackendProduct[]>(`${this.apiUrl}/search`, { params });
  }

  // Price methods
  getPricesForProduct(productId: number): Observable<BackendPrice[]> {
    return this.http.get<BackendPrice[]>(`${this.apiUrl}/prices/product/${productId}`);
  }

  // Health check
  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
