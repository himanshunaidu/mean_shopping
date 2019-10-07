import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authService: AuthService;

  userauth = false;
  private authListenerSubs: Subscription;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.userauth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuth => {
        this.userauth = isAuth;
      });
  }

  onLogout() {
    this.authService.useLogout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
