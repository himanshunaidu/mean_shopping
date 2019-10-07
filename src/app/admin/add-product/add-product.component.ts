import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import {Product} from '../../product/product.model';
import { AdminProdService } from 'src/app/admin/adminprod.service';
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  prodService: AdminProdService;
  route: ActivatedRoute;
  addMode: boolean = true;
  prodId: number;
  prod: Product;

  //For Reactive Form Approach
  form: FormGroup;

  //Spinner
  isLoading = false;

  //For the image
  imagePreview: string;

  constructor(prodService: AdminProdService, route: ActivatedRoute) {
    this.prodService = prodService;
    this.route = route;
   }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(1)]}),
      price: new FormControl(null,
        {validators: [Validators.required]}),
      description: new FormControl(null,
        {validators: [Validators.required]}),
      // The following control is not synchronized with HTML, we will extract it by program
      image: new FormControl(null,
        {validators: [Validators.required],
        asyncValidators: [mimeType]})
    });
    // This following is an observable
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('prodId')) {
        this.addMode = false;
        this.prodId = Number(paramMap.get('prodId'));
        this.isLoading = true;
        //console.log('Did it work?');
        this.prodService.getProduct(this.prodId)
          .subscribe(prodData => {
            console.log(prodData);
            this.prod = {
              _id: prodData._id,
              title: prodData.title,
              price: Number(prodData.price),
              description: prodData.description,
              //imagePath would be a string,
              //hence the mime-type validator would have to pass it explicitly
              imagePath: prodData.imagePath
            };
            this.form.setValue({
              title: this.prod.title,
              price: this.prod.price,
              description: this.prod.description,
              image: this.prod.imagePath
            });
            this.isLoading = false;
            this.imagePreview = this.prod.imagePath;
          });
      } else {
        this.addMode = true;
        this.prodId = null;
      }
    });
  }

  onAddProduct() {
    //console.log('Validating');
    if (this.form.invalid) {
      return;
    }
    //console.log('Validated');

    if (this.addMode === true) {
      this.prodService.addProduct(this.form.value.title,
        this.form.value.price, this.form.value.description, this.form.value.image);
    } else{
      this.prodService.updateProduct(this.prod._id, this.form.value.title,
        this.form.value.price, this.form.value.description, this.form.value.image);
    }

    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

}
