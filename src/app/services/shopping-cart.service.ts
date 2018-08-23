import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }


  addToCart(product: AppProduct) {
    this.updateItemQuantity(product, 1);
  }


  removeFromCart(product: AppProduct) {
    this.updateItemQuantity(product, -1);
  }


  private async updateItemQuantity(product: AppProduct, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.valueChanges()
      .pipe(take(1))
      .subscribe((item: {product: any, quantity: number}) => {
        item$.update({ product: product, quantity: (item ? item.quantity : 0) + change });
      });
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  async getCart() {
    const cartId = await this.getOrCreateCartId();

    return this.db.object(`/shopping-carts/${cartId}`).snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.val();
          return { key: action.payload.key, ...data };
        })
      );
  }


  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const cart = await this.create();
    localStorage.setItem('cartId', cart.key);
    return cart.key;
  }
}
