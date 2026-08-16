import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  Observable,
  switchMap,
  throwError
} from 'rxjs';

import { ApiService } from './api.service';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private api: ApiService,
    private errserv: ErrorDialogService,
    private router: Router
  ) {}


  getTokenExpiration(token: string): number | null {

    if (!token || !token.includes('.')) {
      return null;
    }

    try {

      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      return payload.exp
        ? payload.exp * 1000
        : null;

    } catch {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {

    const exp = this.getTokenExpiration(token);

    if (!exp) {
      return true;
    }

    return Date.now() > exp;
  }



  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const accessToken = localStorage.getItem('access_token');

      
    const isRefreshRequest =
      req.url.includes('/auth/refresh');


    const isAuthRequest =
      req.url.includes('/auth/sign_in') ||
      req.url.includes('/auth/sign_up');



    if (
      accessToken &&
      !isRefreshRequest &&
      !isAuthRequest &&
      this.isTokenExpired(accessToken)
    ) {

      console.log('Token expired → refreshing...');

      return this.api.refreshToken().pipe(

        switchMap((res: any) => {

          
          localStorage.setItem(
            'access_token',
            res.access_token
          );

          
          const clonedReq = req.clone({
            setHeaders: {
              Authorization:
                `Bearer ${res.access_token}`
            }
          });

          return next.handle(clonedReq);
        }),

        catchError((refreshErr) => {

          console.log('Refresh failed');

          
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

          this.router.navigateByUrl('/sign-in');

          return throwError(() => refreshErr);
        })
      );
    }



    let modifiedReq = req;

    if (
      accessToken &&
      !isRefreshRequest &&
      !isAuthRequest
    ) {

      modifiedReq = req.clone({
        setHeaders: {
          Authorization:
            `Bearer ${accessToken}`
        }
      });
    }



    return next.handle(modifiedReq).pipe(

      catchError((err: HttpErrorResponse) => {

        if (err.status === 400) {

          console.log('Bad Request');

          this.errserv.setErrMessage(
            'Wrong Information!'
          );

          this.errserv.showDialog();
        }

        else if (err.status === 401) {

          console.log('Unauthorized');

          this.errserv.setErrMessage(
            'User is not Authorized!'
          );

          this.errserv.showDialog();
        }

        else if (err.status === 404) {

          console.log('Not Found');

          this.errserv.setErrMessage(
            'Not Found!'
          );

          this.errserv.showDialog();
        }

        else if (err.status === 500) {

         this.errserv.setErrMessage(
          'Internal Server Error!'
         )
        }

        else if(err.status === 409){
          this.errserv.setErrMessage(
            'Conflict!'
          )
          console.log('Conflict!');
          
        }

        return throwError(() => err);
      })
    );
  }
}