import { Product } from './product.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ProductService {
  private prods: Product[] = [];
  private prodUpdated = new Subject<Product[]>();
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  getProducts() {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/list/products',
      {withCredentials: true})
      .subscribe((prodData) => {
        this.prods = prodData.products;
        this.prodUpdated.next([...this.prods]);
      });
    // return this.prods;
  }

  getProdUpdateListener() {
    return this.prodUpdated.asObservable();
  }

  getProduct(_id: number) {
    return this.http.get<Product>('http://localhost:3000/list/products/' + _id,
      {withCredentials: true});
    //return {...this.prods.find((prod) => prod._id === _id)};
  }

  addToCart(_id: number) {
    this.http.put<any>('http://localhost:3000/cart/add/' + _id, {_id: _id},
      {withCredentials: true})
      .subscribe(result => {
        console.log(result);
      });
  }

  getCart() {
    return this.http.get<any>('http://localhost:3000/cart/get', {withCredentials: true});
  }

}
