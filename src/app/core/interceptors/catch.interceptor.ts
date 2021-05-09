import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/online/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenResponse } from 'src/app/shared/exchanges/responses/impl/token-response';
import { ButtonType } from 'src/app/shared/models/button-types';

@Injectable()
export class CatchInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!this.authService.JWTHandler.hasTokens()) {
            return this.redirect('Please login again', "/login", true);
          }

          return this.authService.refreshTokens(
            this.authService.UserHandler.getUser().email,
            this.authService.JWTHandler.jwtTokens.refreshToken
            ).pipe(switchMap((response: TokenResponse) => {
              if (response.success) {
                let newHeaders = request.headers.set('Authorization', `Bearer ${response.primaryToken}`);
                return next.handle(request.clone({headers: newHeaders}));
              } else {
                return this.redirect('Please login again', "/login", true);
              }
            })
          );

        } else if (error.status === 403) {
          return this.redirect("You don't have access to this resource", '/login');
        }
        return EMPTY;
    }));
  }

      /**
     * Send a danger alert and redirects the user, returns EMPTY
     * @param message The danger alert to notify the user
     * @param route The route to navigate to
     * @param isLogout Default false, do we want to logout the user
     */
       private redirect(message: string, route: string, isLogout = false): Observable<never> {
        this.snackbar.open(message, ButtonType.CLOSE);
        this.router.navigateByUrl(route);
        if (isLogout) {
          this.authService.logout();
        }
        return EMPTY;
    }

}
