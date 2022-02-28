import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const logged = localStorage.getItem('userInfo');
    if (!!logged) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
    return !!logged;
  }
}
