import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

const adminRoutes: Routes = [
  { path: 'admin/products/new', component: ProductFormComponent,
    canActivate: [
      AuthGuardService,
      AdminAuthGuardService
    ]
  },
  { path: 'admin/products/:id', component: ProductFormComponent,
    canActivate: [
      AuthGuardService,
      AdminAuthGuardService
    ]
  },
  { path: 'admin/products', component: AdminProductsComponent,
    canActivate: [
      AuthGuardService,
      AdminAuthGuardService
    ]
  },
  { path: 'admin/orders', component: AdminOrdersComponent,
    canActivate: [
      AuthGuardService,
      AdminAuthGuardService
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  providers: [
    AdminAuthGuardService
  ],
  exports: [
    RouterModule
  ],
})
export class AdminRoutingModule { }
