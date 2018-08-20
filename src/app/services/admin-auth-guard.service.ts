import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(user => {
        if (user.isAdmin) return true;
        return false;
      })
    );
  }
}
