import { Component, OnInit, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input() product: AppProduct;
  @Input() shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
