import { Product } from '../product/product.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AdminProdService {
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

  addProduct(title1: string, price1: number, description1: string, image: File) {
    //Create the id
    const _id1 = (Math.random() * 10)
    //Formdata allows us to combine text values and blob
    const prodData = new FormData();
    prodData.append('_id', _id1.toString())
    prodData.append('title', title1);
    prodData.append('price', price1.toString());
    prodData.append('description', description1);
    prodData.append('image', image, title1);
    // console.log('Adding');

    console.log({price: price1});
    this.http.post<{message: string, imageUrl: string}>('http://localhost:3000/admin/product',
      prodData, {withCredentials: true})
      .subscribe((responseData) => {
        const prod: Product = {_id: _id1, title: title1,
          price: price1, description: description1, imagePath: responseData.imageUrl};
        console.log(responseData.message);
        this.prods.push(prod);
        this.prodUpdated.next([...this.prods]);
        this.router.navigate(['/shop']);
      });

  }

  deleteProduct(prodId: number) {
    this.http.delete('http://localhost:3000/admin/product/' + prodId, {withCredentials: true})
      .subscribe(() => {
        const updatedProds = this.prods.filter(prod => prod._id !== prodId);
        this.prods = updatedProds;
        this.prodUpdated.next([...this.prods]);
        console.log('Deleted Product');
      });
  }

  getProduct(_id: number) {
    return this.http.get<Product>('http://localhost:3000/list/products/' + _id,
      {withCredentials: true});
    //return {...this.prods.find((prod) => prod._id === _id)};
  }

  updateProduct(_id1: number, title1: string, price1: number,
  description1: string, image1: File | string) {

    let prodData;

    //Check type of image: whether file or string
    if (typeof(image1) === 'object') {
      prodData = new FormData();
      prodData.append('_id', _id1.toString());
      prodData.append('title', title1);
      prodData.append('price', price1.toString());
      prodData.append('description', description1);
      prodData.append('image', image1, title1);
    } else {
      // console.log('Adding');
      prodData =  {
        _id: _id1,
        title: title1,
        price: Number(price1),
        description: description1,
        imagePath: image1
      };
    }
    //console.log(prod);
    this.http.put<{message: string}>('http://localhost:3000/admin/product/' + _id1, prodData,
      {withCredentials: true})
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.router.navigate(['/shop']);
      });
  }

}
