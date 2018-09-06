import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component: CheckOutComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  { path: 'order-success/:id', component: OrderSuccessComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  { path: 'my/orders', component: MyOrdersComponent,
    canActivate: [
      AuthGuardService
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
  exports: [
    RouterModule
  ],
})
export class ShoppingRoutingModule { }
