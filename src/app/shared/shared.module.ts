import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../../environments/environment';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

library.add(faShoppingCart, faGlobeAmericas);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    FontAwesomeModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule.forRoot(),
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FontAwesomeModule,
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    NgbModule,
  ]
})
export class SharedModule { }
