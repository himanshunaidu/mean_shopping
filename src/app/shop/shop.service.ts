import { Product } from '../product/product.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ShopService {
  private prods: Product[] = [];
  private prodUpdated = new Subject<Product[]>();
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  getCart() {
    return this.http.get<{message: string, cart: any, quants: any}>
    ('http://localhost:3000/cart/get', {withCredentials: true});
  }

  removeFromCart(cardId: number) {
    return this.http.put<{message: string}>
    ('http://localhost:3000/cart/remove/' + cardId, {_id: cardId}, {withCredentials: true});
  }

  addOrder(bigCart) {
    return this.http.put<{message: string}>
    ('http://localhost:3000/orders/add', {cart: bigCart}, {withCredentials: true});
  }

  getOrders() {
    return this.http.get<{message: string, orders: any}>
    ('http://localhost:3000/orders/get', {withCredentials: true});
  }

}
