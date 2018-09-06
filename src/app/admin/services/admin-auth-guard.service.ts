import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService
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
