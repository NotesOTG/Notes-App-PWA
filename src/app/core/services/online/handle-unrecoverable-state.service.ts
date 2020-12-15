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
      this.popupService.showPopup(new Popup(
        'Internal Error',
        'Allow me to take care of this? If it doesnt work please manually refresh. You wont lose any data',
        PopupType.ALLOW
      )).subscribe((success: boolean) => {
        do {
          console.log('see one!');
          // window.caches.delete('ngsw*');
          // window.location.reload();
        } while (window.caches.has('ngsw*'));
      });
    });
  }

}
