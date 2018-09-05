import { AuthService } from './../services/auth.service';
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
  cartSubscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    const order = {
      userId: this.userId,
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
