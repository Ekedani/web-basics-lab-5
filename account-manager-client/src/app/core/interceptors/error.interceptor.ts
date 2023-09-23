import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        event => {},
        err => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401 && this.router.url !== '/login') {
              this.router.navigate(['/login']);
            }
            this.router.navigate(['/error'], {state: {error: err.error.message, status: err.status}});
          }
        }
      )
    );
  }
}
