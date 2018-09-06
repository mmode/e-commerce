import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppProduct } from '../shared/models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product: AppProduct) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<AppProduct[]> {
    return this.db.list<AppProduct>('/products').snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.val();
        return { key: a.payload.key, ...data };
      }))
    );
  }

  get(productId: string): Observable<AppProduct> {
    return this.db.object<AppProduct>(`/products/${productId}`)
      .snapshotChanges()
      .pipe(
        map(action => {
          const data = action.payload.val();
          return { key: action.payload.key, ...data };
        })
      );
  }

  update(productId: string, product: AppProduct): Promise<void> {
    return this.db.object(`/products/${productId}`).update(product);
  }

  delete(productId: string): Promise<void> {
    return this.db.object(`/products/${productId}`).remove();
  }
}
