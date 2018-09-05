import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppProduct } from '../models/app-product';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart);

    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category)
          ? this.products.filter(p => p.category === this.category)
          : this.products;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
