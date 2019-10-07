import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  shopService: ShopService;
  orders;

  // For Spinner
  isLoading = false;

  constructor(shopService: ShopService) {
    this.shopService = shopService;
  }

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getOrders()
      .subscribe(result => {
        this.orders = result.orders;
        console.log(this.orders);
        this.isLoading = false;
      });
  }

}
