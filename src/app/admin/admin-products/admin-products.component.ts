import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppProduct } from '../../models/app-product';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  subscription: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query)
      ? this.filteredProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }
}
