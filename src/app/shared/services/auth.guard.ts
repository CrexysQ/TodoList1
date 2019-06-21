import { Injectable } from '@angular/core';
import { UserService } from './users.service';
import { Router,
         CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean> {
    if (this.userService.currentUser != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
