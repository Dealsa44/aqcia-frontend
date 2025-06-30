// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: ':lang/home', component: HomeComponent },
  { path: ':lang/markets', component: MarketsComponent },
  { path: ':lang/search', component: SearchComponent },
  { path: ':lang/product/:id', component: ProductComponent },
  { path: ':lang/cart', component: CartComponent },
  { path: '', redirectTo: 'ka/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'ka/home' }
];