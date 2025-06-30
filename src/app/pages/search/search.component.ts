// pages/search/search.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { productsMocks } from '../../core/mocks/products.mocks';
import { searchMocks } from '../../core/mocks/search.mocks';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  productsMocks = productsMocks;
  searchMocks = searchMocks;
  searchTerm = '';
  selectedCategory = '';
  products: Product[] = productsMocks.products as Product[]; // Explicitly type as Product[]
  categories = productsMocks.categories;
  filteredProducts: Product[] = this.products;

  constructor(
    public languageService: LanguageService,
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['q']) {
        this.searchTerm = params['q'];
        this.searchProducts();
      }
    });
  }

  searchProducts() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product: Product) => {
      const nameMatch = product.name.some((name: string) =>
        name.toLowerCase().includes(searchTermLower)
      );
      const categoryMatch =
        !this.selectedCategory || product.category === this.selectedCategory;
      return nameMatch && categoryMatch;
    });
  }

  getCurrentText(items: string[] | any[]) {
    return items[this.languageService.getCurrentLanguage()];
  }

  getLowestPrice(product: Product) {
    const prices = product.prices.map((p) => p.price - (p.discount || 0));
    const minPrice = Math.min(...prices);
    const market = product.prices.find(
      (p) => p.price - (p.discount || 0) === minPrice
    );
    return { price: minPrice, market: market?.market || '' };
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: this.getLowestPrice(product).price,
      image: product.image,
      quantity: 1,
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.searchProducts();
  }

  clearFilters() {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }
}