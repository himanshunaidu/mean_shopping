import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  form: FormGroup;
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(1)]}),
      password: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]}),
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    console.log('Posting the login data');
    this.authService.getLogin(this.form.value.name, this.form.value.password);
  }

}
