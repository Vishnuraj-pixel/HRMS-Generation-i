import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: HelpersService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!localStorage.getItem('accessToken')) {
      this._snackBar.open(
        'You are not authorized to access this page!',
        'Close', {
          duration: 5
        }
      );
      this.router.navigate(['/auth/sign-in']);
      return false;
    }
    return true;
  }
}
