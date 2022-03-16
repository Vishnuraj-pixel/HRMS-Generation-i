import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  constructor(private helper: HelpersService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log('request sending...', req.headers);
    const token = localStorage.getItem('accessToken')!;
    if (token) {
      const decryptToken = this.helper.decrypt(token);
      req = req.clone({
        setHeaders: { 'Authorization': `Bearer ${decryptToken}` }
      }) 
    }

    return next.handle(req).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            console.warn('Api Error: 401')
          }
        }
        return throwError(err);
      })
    );
  }
}
