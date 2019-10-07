import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(1)]}),
      email: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(1)]}),
      password: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]}),
    });
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }
    console.log('Posting the login data');
    this.authService.postSignup(this.form.value.username,
      this.form.value.email, this.form.value.password);
  }


}
