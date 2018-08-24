import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(
    public auth: AuthService,
    public cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
