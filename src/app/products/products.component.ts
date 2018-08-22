import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppProduct } from '../models/app-product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  categories$;
  category: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

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
}
