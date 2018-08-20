import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll() {
    return this.db.list('/categories').snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.val();
          return { key: a.payload.key, ...data };
        }))
    );
  }
}
