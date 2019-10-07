import { Component, OnInit } from '@angular/core';

import { ShopService } from '../shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shopService: ShopService;
  cart;
  quants;

  // For Spinner
  isLoading = false;

  constructor(shopService: ShopService) {
    this.shopService = shopService;
  }

  ngOnInit() {
    this.isLoading = true;
    this.shopService.getCart()
      .subscribe(result => {
        console.log(result.cart);
        this.cart = result.cart;
        this.quants = result.quants;
        // Match quantity values for cart items
        this.cart.forEach(item => {
          this.quants.forEach(quant => {
            // console.log(item._id + ' vs ' + quant.prodId);
            if (item._id == quant.prodId) {
              item.quantity = quant.quantity;
            }
          });
        });
        console.log('Cart: ', this.cart);
        this.isLoading = false;
      });
  }

  onRemove(cardId: number) {

    const index = this.cart.findIndex(c => {
      return c._id == cardId;
    });
    const quant = this.cart[index].quantity - 1;
    if (quant === 0) {
      this.cart.splice(index, 1);
      // console.log('Spliced');
    } else {
      this.cart[index].quantity = quant;
      // console.log('Reduced');
    }
    // console.log(this.cart);

    this.shopService.removeFromCart(cardId)
      .subscribe(message => {
        console.log(message);
      });
  }

  onOrder(bigCart) {
    this.shopService.addOrder(bigCart)
      .subscribe(message => {
        console.log(message);
        this.cart = [];
      });
  }

}
