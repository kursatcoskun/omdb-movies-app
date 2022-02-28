import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  {
  userInfo!: UserInfo;

  constructor(private router: Router) {}


  get getUserInfo(): boolean {
    const userDataLocalStorage = localStorage.getItem('userInfo');

    this.userInfo = userDataLocalStorage
      ? JSON.parse(userDataLocalStorage)
      : null;
    return !!this.userInfo?.email && !!this.userInfo?.password;
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/auth']);
  }
}
