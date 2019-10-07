import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Product} from '../product.model';
import { ProductService } from '../product.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  prodService: ProductService;
  prodSub: Subscription;

  authService: AuthService;
  authSub: Subscription;
  userAuth = false;

  //For Spinner
  isLoading = false;

  constructor(prodService: ProductService, authService: AuthService) {
    this.prodService = prodService;
    this.authService = authService;
   }

  /*products: Product[] = [
    {_id: 1, title: 'Eragon', price: 21.99, description: 'Fantasy Novel'},
    {_id: 2, title: 'Eldest', price: 21.99, description: 'Fantasy Novel'},
    {_id: 3, title: 'Brisingr', price: 21.99, description: 'Fantasy Novel'}
  ];*/

  products: Product[] = [];

  ngOnInit() {
    this.isLoading = true;
    this.userAuth = this.authService.getIsAuth();
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe((isAuth: boolean) => {
        this.userAuth = isAuth;
      });
    this.prodService.getProducts();
    this.prodSub = this.prodService.getProdUpdateListener()
    .subscribe((prods: Product[]) => {
      this.products = prods;
      this.isLoading = false;
    });

  }

  onAddToCart(prodId: number) {
    this.prodService.addToCart(prodId);
  }

  ngOnDestroy() {
    this.prodSub.unsubscribe();
  }

}
