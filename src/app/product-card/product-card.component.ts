import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppProduct } from './../models/app-product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: AppProduct;
  @Input() showActions = true;
  @Input() shoppingCart;

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

  getQuantity() {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
