import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { Err404Component } from './utils/err404/err404.component';
import { AdminProdListComponent } from './admin/admin-prod-list/admin-prod-list.component';
import { CartComponent } from './shop/cart/cart.component';
import { OrdersComponent } from './shop/orders/orders.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'shop', component: ProductListComponent},
  {path: 'admin', component: AdminProdListComponent, canActivate: [AuthGuard]},
  {path: 'admin/add', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'admin/edit/:prodId', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: '404', component: Err404Component}
  // ,{path: '**', redirectTo: '404'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
