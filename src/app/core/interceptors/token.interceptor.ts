import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/online/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.JWTHandler.hasTokens()) {
      let newHeaders: HttpHeaders = request.headers.append('Authorization', `Bearer ${this.authService.JWTHandler.jwtTokens.primaryToken}`);
      return next.handle(request.clone({headers: newHeaders}));
    }
    return next.handle(request);
  }
}
