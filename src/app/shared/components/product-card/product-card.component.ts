import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { AppProduct } from '../../models/app-product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: AppProduct;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
