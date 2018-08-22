import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        return { key: a.payload.key, ...data };
      }))
    );
  }

  get(productId) {
    return this.db.object(`/products/${productId}`).valueChanges();
  }

  update(productId, product) {
    return this.db.object(`/products/${productId}`).update(product);
  }

  delete(productId: string) {
    return this.db.object(`/products/${productId}`).remove();
  }
}
