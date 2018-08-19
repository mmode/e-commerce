import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  save(user: User) {
    this.db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      email: user.email
    });
  }
}
