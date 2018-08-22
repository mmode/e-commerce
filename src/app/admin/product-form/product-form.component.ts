import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

  save(product) {
    this.productService.create(product);
  }

}
