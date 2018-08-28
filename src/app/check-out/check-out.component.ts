import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingCart } from './../models/shopping-cart';
import { OrderService } from './../services/order.service';
import { ShoppingCartService } from './../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    const order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };

    this.orderService.storeOrder(order);
  }
}
