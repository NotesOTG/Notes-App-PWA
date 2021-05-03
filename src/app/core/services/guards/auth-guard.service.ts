import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../online/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const redirectRoute = route.data.redirect ?? '/notes';
    if (this.auth.UserHandler.isUserExisting()) {
      this.router.navigateByUrl(redirectRoute);
      return false;
    }
    return true;
  }



}
