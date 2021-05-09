import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../online/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGaurdService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const redirectRoute = route.data.redirect ?? '/notes';
    if (!this.auth.UserHandler.isUserExisting()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }


}
