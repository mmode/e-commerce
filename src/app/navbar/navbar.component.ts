import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription;
  shoppingCartItemCount: number;

  constructor(
    public auth: AuthService,
    public cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    const cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;

      for (const productId in cart.items) {
        if (productId) this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
