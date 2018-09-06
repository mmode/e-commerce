import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap(user => this.orderService.getOrderByUser(user.uid))
    );
  }

}
