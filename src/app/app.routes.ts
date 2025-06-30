// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { MarketDetailsComponent } from './pages/market-details/market-details.component';
import { MarketProductsComponent } from './pages/market-products/market-products.component';

export const routes: Routes = [
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/markets', component: MarketsComponent },
  { path: ':lang/search', component: SearchComponent },
  { path: ':lang/cart', component: CartComponent },
  { path: ':lang/product/:id', component: ProductComponent },
  { path: ':lang/market-details/:id', component: MarketDetailsComponent },
  { path: ':lang/market-products/:marketId', component: MarketProductsComponent },
  { path: ':lang/market-products/:marketId/:categoryId', component: MarketProductsComponent },
  { path: '', redirectTo: '/en/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/en/home' }
];