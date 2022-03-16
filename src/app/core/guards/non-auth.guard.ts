import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {
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
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/admin']);
      this._snackBar.open("You already logged in", "Close", {
        duration: 5
      })
      console.log('non-auth-guard');
      return false;
    }
    return true;
  }
}
