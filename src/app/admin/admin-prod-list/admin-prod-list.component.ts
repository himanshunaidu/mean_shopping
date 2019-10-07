import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {Product} from '../../product/product.model';
import { AdminProdService } from 'src/app/admin/adminprod.service';

@Component({
  selector: 'app-admin-prod-list',
  templateUrl: './admin-prod-list.component.html',
  styleUrls: ['./admin-prod-list.component.css']
})
export class AdminProdListComponent implements OnInit {

  prodService: AdminProdService;
  prodSub: Subscription;

  //For Spinner
  isLoading = false;

  constructor(prodService: AdminProdService) {
    this.prodService = prodService;
   }

  /*products: Product[] = [
    {_id: 1, title: 'Eragon', price: 21.99, description: 'Fantasy Novel'},
    {_id: 2, title: 'Eldest', price: 21.99, description: 'Fantasy Novel'},
    {_id: 3, title: 'Brisingr', price: 21.99, description: 'Fantasy Novel'}
  ];*/

  products: Product[] = [];

  ngOnInit() {
    this.isLoading = true;
    this.prodService.getProducts();
    this.prodSub = this.prodService.getProdUpdateListener()
    .subscribe((prods: Product[]) => {
      this.products = prods;
      this.isLoading = false;
    });

  }

  onDelete(prodId: number) {
    this.prodService.deleteProduct(prodId);
  }

  ngOnDestroy() {
    this.prodSub.unsubscribe();
  }

}
