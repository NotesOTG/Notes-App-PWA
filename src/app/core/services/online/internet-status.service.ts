import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternetStatusService {

  private _onlineSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  public InitService() {
    console.log('starting service');
    setTimeout(() => {
      console.log("we're setting up to listen");
      window.addEventListener('online', () => {
        console.log('went online!');
      });
  
      window.addEventListener('offline', () => {
        console.log('went offline!');
      });
    }, 40 * 1000);
  }

  private setupEvents() {

  }
}
