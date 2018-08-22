import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: any;
  product = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id)
        .pipe(take(1))
        .subscribe(product => this.product = product);
    }
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
