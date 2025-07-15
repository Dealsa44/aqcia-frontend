// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { MarketDetailsComponent } from './pages/market-details/market-details.component';
import { MarketProductsComponent } from './pages/market-products/market-products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // { path: ':lang/home', component: HomeComponent },
  { path: ':lang/markets', component: MarketsComponent },
  { path: ':lang/catalog', component: CatalogComponent },
  { path: ':lang/cart', component: CartComponent },
  { path: ':lang/product/:id', component: ProductComponent },
  { path: ':lang/market-details/:id', component: MarketDetailsComponent },
  {
    path: ':lang/market-products/:marketId',
    component: MarketProductsComponent,
  },
  {
    path: ':lang/market-products/:marketId/:categoryId',
    component: MarketProductsComponent,
  },
  { path: ':lang/login', component: LoginComponent },
  { path: ':lang/register', component: RegisterComponent },
  { path: ':lang/forgot-password', component: ForgotPasswordComponent },
  {
    path: ':lang/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/en/catalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/en/catlog' },
];
