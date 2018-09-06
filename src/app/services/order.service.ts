import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getAll() {
    return this.db.list('/orders').valueChanges();
  }

  getOrderByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }
}
