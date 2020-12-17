import { Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Popup, PopupType } from 'src/app/shared/models/popup';
import { PopupService } from '../offline/popup.service';

@Injectable({
  providedIn: 'root'
})
export class HandleUnrecoverableStateService {

  /**
   * The Service Worker Update object
   */
  private updates: SwUpdate;

    /**
   * The popup service so we can get user input
   */
  private popupService: PopupService;
  
  constructor(private injector: Injector) {
    this.updates = this.injector.get(SwUpdate);
    this.popupService = this.injector.get(PopupService);
  }

  initService() {
    this.updates.unrecoverable.subscribe(event => {
      window.alert("App has encountered a fatal flaw please refresh, You wont lose any data");
    });
  }

  public clearCache() {
      window.caches.keys().then(keyList => {
        if (keyList === (null || undefined)) {
          
        }
        
        for (let i = 0; i < keyList.length; i++) {
          window.caches.delete(keyList[i]);
        }
        window.location.reload();
      }).then(_ => {
        window.location.reload();
      });
  }

}
