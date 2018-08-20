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

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
