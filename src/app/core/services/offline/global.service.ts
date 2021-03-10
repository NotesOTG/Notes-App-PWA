import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private sessionStorage: Storage;

  constructor(public router: Router) {
    this.sessionStorage = window.sessionStorage;
    if (this.sessionStorage.getItem('FIRST_LOAD') == null) {
      this.sessionStorage.setItem('FIRST_LOAD', 'true');
    }

    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (event.url === '/') {
            this.sessionStorage.setItem('LANDING_LOADED', 'true');
          }
        }, 25);
      }
    });
  }

  public isFirstLoad(): boolean {
    return !sessionStorage.getItem('FIRST_LOAD') != null;
  }

  public hasLandingLoaded(): boolean {
    return sessionStorage.getItem('LANDING_LOADED') != null;
  }



}
