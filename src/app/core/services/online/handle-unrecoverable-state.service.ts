import { Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class HandleUnrecoverableStateService {

  /**
   * The Service Worker Update object
   */
  private updates: SwUpdate;
  
  constructor(private injector: Injector) {
    this.updates = this.injector.get(SwUpdate);
  }

  initService() {
    this.updates.unrecoverable.subscribe(event => {
      window.alert("App has encountered a fatal flaw please refresh, You wont lose any data");
    });
  }

}
