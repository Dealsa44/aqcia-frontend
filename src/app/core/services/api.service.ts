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
    console.log('📁 Getting subcategories for category:', categoryId);
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/categories/${categoryId}/subcategories`).pipe(
      tap({
        next: (subcategories) => console.log('✅ Subcategories loaded:', subcategories.length),
        error: (error) => console.log('❌ Error loading subcategories:', error)
      })
    );
  }

  // ===== CATEGORIES & SUBCATEGORIES =====
  
  // Get all categories (v2)
  getAllCategories(): Observable<ApiCategory[]> {
    console.log('📂 Getting all categories');
    return this.http.get<ApiCategory[]>(`${this.baseUrl}/catalog/categories/v2`).pipe(
      tap({
        next: (categories) => console.log('✅ Categories loaded:', categories.length),
        error: (error) => console.log('❌ Error loading categories:', error)
      })
    );
  }

  // Get category by ID
  getCategory(id: number): Observable<ApiCategory> {
    console.log('📂 Getting category:', id);
    return this.http.get<ApiCategory>(`${this.baseUrl}/catalog/categories/v2/${id}`).pipe(
      tap({
        next: (category) => console.log('✅ Category loaded:', category),
        error: (error) => console.log('❌ Error loading category:', error)
      })
    );
  }

  // Get all subcategories
  getAllSubcategories(): Observable<ApiSubcategory[]> {
    console.log('📁 Getting all subcategories');
    return this.http.get<ApiSubcategory[]>(`${this.baseUrl}/catalog/subcategories`).pipe(
      tap({
        next: (subcategories) => console.log('✅ Subcategories loaded:', subcategories.length),
        error: (error) => console.log('❌ Error loading subcategories:', error)
      })
    );
  }

  // Get subcategory by ID
  getSubcategory(id: number): Observable<ApiSubcategory> {
    console.log('📁 Getting subcategory:', id);
    return this.http.get<ApiSubcategory>(`${this.baseUrl}/catalog/subcategories/${id}`).pipe(
      tap({
        next: (subcategory) => console.log('✅ Subcategory loaded:', subcategory),
        error: (error) => console.log('❌ Error loading subcategory:', error)
      })
    );
  }

  // ===== SEARCH =====
  
  // Search products with comprehensive logging
  searchProductsComprehensive(query: string, skip: number = 0, limit: number = 100): Observable<ApiProduct[]> {
    console.log('🔍 Searching products:', { query, skip, limit });
    const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
    console.log('🌐 Search URL:', url);
    
    return this.http.get<ApiProduct[]>(url).pipe(
      tap({
        next: (products) => console.log('✅ Search results:', products.length, 'products found'),
        error: (error) => console.log('❌ Search error:', error)
      })
    );
  }

  // ===== STORES =====
  
  // Get all stores
  getStores(): Observable<ApiStore[]> {
    console.log('🏪 Getting all stores');
    return this.http.get<ApiStore[]>(`${this.baseUrl}/stores`).pipe(
      tap({
        next: (stores) => console.log('✅ Stores loaded:', stores.length),
        error: (error) => console.log('❌ Error loading stores:', error)
      })
    );
  }

  // Get store by ID
  getStore(id: number): Observable<ApiStore> {
    console.log('🏪 Getting store:', id);
    return this.http.get<ApiStore>(`${this.baseUrl}/stores/${id}`).pipe(
      tap({
        next: (store) => console.log('✅ Store loaded:', store),
        error: (error) => console.log('❌ Error loading store:', error)
      })
    );
  }

  // ===== USERS =====
  
  // Create user
  createUser(userData: Partial<ApiUser>): Observable<ApiUser> {
    console.log('👤 Creating user:', userData);
    return this.http.post<ApiUser>(`${this.baseUrl}/users/`, userData).pipe(
      tap({
        next: (user) => console.log('✅ User created:', user),
        error: (error) => console.log('❌ Error creating user:', error)
      })
    );
  }

  // Get user by ID
  getUser(id: number): Observable<ApiUser> {
    console.log('👤 Getting user:', id);
    return this.http.get<ApiUser>(`${this.baseUrl}/users/${id}`).pipe(
      tap({
        next: (user) => console.log('✅ User loaded:', user),
        error: (error) => console.log('❌ Error loading user:', error)
      })
    );
  }

  // ===== SHOPPING LISTS =====
  
  // Get shopping lists for user
  getShoppingLists(userId: number): Observable<ApiShoppingList[]> {
    console.log('📝 Getting shopping lists for user:', userId);
    return this.http.get<ApiShoppingList[]>(`${this.baseUrl}/shopping-lists/user/${userId}`).pipe(
      tap({
        next: (lists) => console.log('✅ Shopping lists loaded:', lists.length),
        error: (error) => console.log('❌ Error loading shopping lists:', error)
      })
    );
  }

  // Create shopping list
  createShoppingList(listData: Partial<ApiShoppingList>): Observable<ApiShoppingList> {
    console.log('📝 Creating shopping list:', listData);
    return this.http.post<ApiShoppingList>(`${this.baseUrl}/shopping-lists/`, listData).pipe(
      tap({
        next: (list) => console.log('✅ Shopping list created:', list),
        error: (error) => console.log('❌ Error creating shopping list:', error)
      })
    );
  }

  // ===== NOTIFICATIONS =====
  
  // Get notifications for user
  getNotifications(userId: number): Observable<ApiNotification[]> {
    console.log('🔔 Getting notifications for user:', userId);
    return this.http.get<ApiNotification[]>(`${this.baseUrl}/notifications/user/${userId}`).pipe(
      tap({
        next: (notifications) => console.log('✅ Notifications loaded:', notifications.length),
        error: (error) => console.log('❌ Error loading notifications:', error)
      })
    );
  }

  // ===== CART =====
  
  // Get cart (placeholder)
  getCart(): Observable<any> {
    console.log('🛒 Getting cart');
    return this.http.get<any>(`${this.baseUrl}/cart`).pipe(
      tap({
        next: (cart) => console.log('✅ Cart loaded:', cart),
        error: (error) => console.log('❌ Error loading cart:', error)
      })
    );
  }

  // Add to cart (placeholder)
  addToCart(productId: number, quantity: number = 1): Observable<any> {
    console.log('🛒 Adding to cart:', { productId, quantity });
    return this.http.post<any>(`${this.baseUrl}/cart/add`, { product_id: productId, quantity }).pipe(
      tap({
        next: (result) => console.log('✅ Added to cart:', result),
        error: (error) => console.log('❌ Error adding to cart:', error)
      })
    );
  }

  // ===== HEALTH & DEBUG =====
  
  // Health check
  getHealth(): Observable<any> {
    console.log('🏥 Checking health');
    return this.http.get<any>(`${this.baseUrl}/health`).pipe(
      tap({
        next: (health) => console.log('✅ Health check:', health),
        error: (error) => console.log('❌ Health check failed:', error)
      })
    );
  }

  // Debug info
  getDebugInfo(): Observable<any> {
    console.log('🔍 Getting debug info');
    return this.http.get<any>(`${this.baseUrl}/debug`).pipe(
      tap({
        next: (debug) => console.log('✅ Debug info:', debug),
        error: (error) => console.log('❌ Error getting debug info:', error)
      })
    );
  }
}
