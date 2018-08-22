import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products = [];
  filteredProducts = [];
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
