import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private http: HttpClient;
  private router: Router;

  private isAuth: boolean = false;
  private authStatusListener = new Subject<boolean>();

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getLogin(username1: string, password1: string) {
    console.log(username1 + ": " + password1);
    // Need to set headers and withCredentials for cookies
    const settings = {
      params: {
        name: username1,
        password: password1
      },
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    console.log('Getting data from backend');

    this.http.get<{login: boolean}>('http://localhost:3000/login', settings)
      .subscribe(result => {
        console.log(result);
        if (result.login) {
          this.isAuth = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/shop']);
        }
      });
  }

  postSignup(username1: string, email1: string, password1: string) {
    const user: User = {
      _id: (Math.random() * 10),
      name: username1,
      email: email1,
      password: password1,
      cart: null
    };
    console.log('Sending data to backend');
    this.http.post<{message: string}>('http://localhost:3000/signup', {user: user})
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['']);
      });
  }

  useLogout() {
    this.http.get<{message: string}>('http://localhost:3000/logout', {withCredentials: true})
      .subscribe(result => {
        console.log(result);
        this.isAuth = false;
        this.authStatusListener.next(false);
        this.router.navigate(['']);
      });
  }
}
