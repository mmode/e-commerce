import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppProduct } from '../models/app-product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`).remove();
  }

  addToCart(product: AppProduct) {
    this.updateItem(product, 1);
  }


  removeFromCart(product: AppProduct) {
    this.updateItem(product, -1);
  }


  private async updateItem(product: AppProduct, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.valueChanges()
      .pipe(take(1))
      .subscribe((item: {product: any, quantity: number}) => {
        const quantity = (item ? item.quantity : 0) + change;

        if (quantity < 1) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
        }
      });
  }


  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();

    return this.db.object<any>(`/shopping-carts/${cartId}`).valueChanges()
      .pipe(map(cart => (cart) ? new ShoppingCart(cart.items) : new ShoppingCart(null)));
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const cart = await this.create();
    localStorage.setItem('cartId', cart.key);
    return cart.key;
  }
}
