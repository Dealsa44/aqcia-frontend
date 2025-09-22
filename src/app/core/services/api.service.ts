import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timeout, retry, catchError, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MobileBrowserService } from './mobile-browser.service';

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

export interface ApiStore {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  opening_hours: string;
}

export interface ApiUser {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  is_active: boolean;
}

export interface ApiShoppingList {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  items: ApiShoppingListItem[];
}

export interface ApiShoppingListItem {
  id: number;
  shopping_list_id: number;
  product_id: number;
  quantity: number;
  notes: string;
}

export interface ApiNotification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  // Mobile-friendly headers
  private getHttpOptions() {
    const mobileHeaders = this.mobileBrowserService.getMobileHeaders();
    return {
      headers: new HttpHeaders(mobileHeaders)
    };
  }

  constructor(
    private http: HttpClient,
    private mobileBrowserService: MobileBrowserService
  ) {
    // Log mobile browser info for debugging
    this.mobileBrowserService.logMobileInfo();
  }

  // Get all products
  getProducts(skip: number = 0, limit: number = 100): Observable<ApiProduct[]> {
    const timestamp = Date.now();
    const url = `${this.baseUrl}/products/?skip=${skip}&limit=${limit}&v=${timestamp}`;
    
    // Add comprehensive error handling and logging
    return this.http.get<ApiProduct[]>(url, {
      ...this.getHttpOptions(),
      observe: 'response',
      reportProgress: true
    }).pipe(
      timeout(20000), // Increased timeout for mobile networks
      retry({
        count: this.mobileBrowserService.isMobileBrowser() ? 3 : 1,
        delay: (error, retryCount) => {
          console.log(`🔄 Retry attempt ${retryCount} for mobile browser`);
          return new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }),
      tap({
        next: (response) => {
          console.log('✅ API Response received:', response.status);
        },
        error: (error) => {
          console.error('❌ API Error:', error);
        },
        complete: () => {
          console.log('✅ API Request completed');
        }
      }),
      map(response => response.body || []),
      catchError(error => {
        console.error('❌ Final API Error after retries:', error);
        return throwError(() => error);
      })
    );
  }

  // Get all categories
  getCategories(): Observable<ApiCategory[]> {
    return this.http.get<ApiCategory[]>(`${this.baseUrl}/catalog/categories/v2`, this.getHttpOptions());
  }

  // Get all subcategories
  getSubcategories(): Observable<ApiSubcategory[]> {
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/subcategories`, this.getHttpOptions());
  }

  // Search products
  searchProducts(query: string): Observable<ApiProduct[]> {
    return this.http.get<ApiProduct[]>(`${this.baseUrl}/search?q=${query}`, this.getHttpOptions());
  }

  // Get product by ID
  getProduct(id: number): Observable<ApiProduct> {
    return this.http.get<ApiProduct>(`${this.baseUrl}/products/${id}`, this.getHttpOptions());
  }

  // Get prices for a product
  getProductPrices(productId: number): Observable<ApiPrice[]> {
    return this.http.get<ApiPrice[]>(`${this.baseUrl}/prices/product/${productId}`, this.getHttpOptions());
  }

  // Get subcategories for a category
  getSubcategoriesForCategory(categoryId: number): Observable<ApiSubcategory[]> {
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/categories/${categoryId}/subcategories`, this.getHttpOptions());
  }

  // ===== CATEGORIES & SUBCATEGORIES =====
  
  // Get all categories (v2)
  getAllCategories(): Observable<ApiCategory[]> {
    return this.http.get<ApiCategory[]>(`${this.baseUrl}/catalog/categories/v2`, this.getHttpOptions());
  }

  // Get category by ID
  getCategory(id: number): Observable<ApiCategory> {
    return this.http.get<ApiCategory>(`${this.baseUrl}/catalog/categories/v2/${id}`, this.getHttpOptions());
  }

  // Get all subcategories
  getAllSubcategories(): Observable<ApiSubcategory[]> {
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/subcategories`, this.getHttpOptions());
  }

  // Get subcategory by ID
  getSubcategory(id: number): Observable<ApiSubcategory> {
    return this.http.get<ApiSubcategory>(`${this.baseUrl}/catalog/subcategories/${id}`, this.getHttpOptions());
  }

  // ===== SEARCH =====
  
  // Search products with comprehensive logging
  searchProductsComprehensive(query: string, skip: number = 0, limit: number = 100): Observable<ApiProduct[]> {
    const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
    
    return this.http.get<ApiProduct[]>(url, this.getHttpOptions());
  }

  // ===== STORES =====
  
  // Get all stores
  getStores(): Observable<ApiStore[]> {
    return this.http.get<ApiStore[]>(`${this.baseUrl}/stores`, this.getHttpOptions());
  }

  // Get store by ID
  getStore(id: number): Observable<ApiStore> {
    return this.http.get<ApiStore>(`${this.baseUrl}/stores/${id}`, this.getHttpOptions());
  }

  // ===== USERS =====
  
  // Create user
  createUser(userData: Partial<ApiUser>): Observable<ApiUser> {
    return this.http.post<ApiUser>(`${this.baseUrl}/users/`, userData);
  }

  // Get user by ID
  getUser(id: number): Observable<ApiUser> {
    return this.http.get<ApiUser>(`${this.baseUrl}/users/${id}`);
  }

  // ===== SHOPPING LISTS =====
  
  // Get shopping lists for user
  getShoppingLists(userId: number): Observable<ApiShoppingList[]> {
    return this.http.get<ApiShoppingList[]>(`${this.baseUrl}/shopping-lists/user/${userId}`);
  }

  // Create shopping list
  createShoppingList(listData: Partial<ApiShoppingList>): Observable<ApiShoppingList> {
    return this.http.post<ApiShoppingList>(`${this.baseUrl}/shopping-lists/`, listData);
  }

  // ===== NOTIFICATIONS =====
  
  // Get notifications for user
  getNotifications(userId: number): Observable<ApiNotification[]> {
    return this.http.get<ApiNotification[]>(`${this.baseUrl}/notifications/user/${userId}`);
  }

  // ===== CART =====
  
  // Get cart (placeholder)
  getCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart`);
  }

  // Add to cart (placeholder)
  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/add`, { product_id: productId, quantity });
  }

  // ===== HEALTH & DEBUG =====
  
  // Health check
  getHealth(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/health`, this.getHttpOptions());
  }

  // Debug info
  getDebugInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/debug`, this.getHttpOptions());
  }
}
