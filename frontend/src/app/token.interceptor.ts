import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from './login/login.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private refreshing = false;

  private static _notAppliedTo = [
    '/api/login',
    '/api/register',
    '/api/forgot-pw',
    '/api/refresh'
  ];
  public static get notAppliedTo() {
    return TokenInterceptor._notAppliedTo;
  }
  public static set notAppliedTo(value) {
    TokenInterceptor._notAppliedTo = value;
  }

  constructor(private readonly loginService: LoginService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (TokenInterceptor.notAppliedTo.includes(request.url)) return next.handle(request);
    const clone = request.clone({
      setHeaders: {
        'Authorization': localStorage.getItem('access-token')
      }
    });
    return next.handle(clone)
                .pipe(
                  catchError(error => {
                    if(error instanceof HttpErrorResponse && error.status === 401) {
                      return this.refreshToken(request, next)
                    }
                    return throwError(error)
                  })
                )
  } 

  private refreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.refreshing) {
      this.refreshing = true;
      this.refreshTokenSubject.next(null);

      return this.loginService.refresh().pipe(
        switchMap(tokens => {
          this.refreshing = false;
          this.refreshTokenSubject.next(tokens.refresh);
          const clone = request.clone({
            setHeaders: {
              'Authorization': tokens.access
            }
          })
          return next.handle(clone);
        })
      )
    }
    
    return this.refreshTokenSubject.pipe(
      filter(token => !!token),
      take(1),
      switchMap(() => {
        const clone = request.clone({
          setHeaders: {
            'Authorization': localStorage.getItem('acess-token')
          }
      });
      return next.handle(clone);
      })
    )
  }
}
