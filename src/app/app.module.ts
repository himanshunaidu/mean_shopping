import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatCardModule, MatButtonModule,
  MatFormFieldModule, MatToolbarModule, MatExpansionModule, MatGridListModule,
  MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { OrdersComponent } from './shop/orders/orders.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { CartComponent } from './shop/cart/cart.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { HeaderComponent } from './utils/header/header.component';
import { Err404Component } from './utils/err404/err404.component';
import { AppRoutingModule } from './app.routing.module';
import { ProductService } from './product/product.service';
import { AdminProdListComponent } from './admin/admin-prod-list/admin-prod-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    OrdersComponent,
    CheckoutComponent,
    CartComponent,
    AddProductComponent,
    EditProductComponent,
    HeaderComponent,
    Err404Component,
    AdminProdListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatToolbarModule,
    MatExpansionModule, MatGridListModule, MatProgressSpinnerModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
