import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
        catchError( (err : any) => {
              if(err.status == 400){
                console.log("bad request");
                this.errserv.setErrMessage("Wrong Information!")
                this.errserv.showDialog()
              }
               else if(err.status == 404){
                console.log("not fountd");
                this.errserv.setErrMessage("Not Found!")
                this.errserv.showDialog()
              }
             else if(err.status == 401){
                console.log("User is not authorized");
                this.errserv.setErrMessage("User is not Authorized!")
                this.errserv.showDialog()
              }
              else if(err.status == 500){
                console.log("internal server error");
              }
            
              return  throwError(() => err.status)
              
        })
       )
  }

  constructor(private errserv : ErrorDialogService) { }
}
