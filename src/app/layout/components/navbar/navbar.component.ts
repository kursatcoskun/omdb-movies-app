import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userInfo!: UserInfo;

  constructor(private router: Router) {}

  ngOnInit() {
    const userDataLocalStorage = localStorage.getItem('userInfo');

    this.userInfo = userDataLocalStorage
      ? JSON.parse(userDataLocalStorage)
      : null;
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/auth']);
  }
}
