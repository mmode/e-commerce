import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<any>;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }

}
