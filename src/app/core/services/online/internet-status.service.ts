import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternetStatusService {

  /**
   * Creation and assigning of the online subject object
   */
  private _onlineSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  /**
   * Waits 45 seconds before getting current internet connection
   * Starts the listening for internet connection results
   */
  public initService() {
    setTimeout(() => {
      this._onlineSubject.next(window.navigator.onLine);
      window.addEventListener('online', () => {
        this._onlineSubject.next(true);
      });
      window.addEventListener('offline', () => {
        this._onlineSubject.next(false);
      });
    }, 40 * 1000);
  }

  /**
   * The online subject object
   */
  public get onlineSubject(): Subject<boolean> {
    return this._onlineSubject;
  }

}
