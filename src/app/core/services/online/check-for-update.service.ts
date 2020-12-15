import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { SwUpdate, UpdateActivatedEvent, UpdateAvailableEvent } from '@angular/service-worker';
import { InternetStatusService } from './internet-status.service';
import { concatAll, concatMap, first, map, switchMap, switchMapTo, take } from 'rxjs/operators';
import { interval, of, concat, merge } from 'rxjs';
import { PopupService } from '../offline/popup.service';
import { Popup, PopupType } from 'src/app/shared/models/popup';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  private internetStatus: InternetStatusService;
  private appRef: ApplicationRef;
  private updates: SwUpdate;
  private popupService: PopupService;
  private snackbar: MatSnackBar;

  private isOnline = false;

  constructor(private injector: Injector) {
    this.internetStatus = this.injector.get(InternetStatusService);
    this.updates = this.injector.get(SwUpdate);
    this.popupService = this.injector.get(PopupService);
    this.snackbar = this.injector.get(MatSnackBar);
  }

  public initService() {
    this.appRef = this.injector.get(ApplicationRef);
    
    this.internetStatus.onlineSubject.subscribe((online: boolean) => {
      this.isOnline = online;
    });

    this.startUpdateChecker();
    this.startUpdateAvailableChecker();
    this.startUpdateAppliedChecker();
    console.log('starting the update listeners');
    //create dummy interval that will check for updates here and there. Cant with setInterval running constantly.....
    //could use currentTimeMillis on every check when it returns true

  }

  private startUpdateAvailableChecker(): void {
    this.updates.available.subscribe(() => {
      this.popupService.showPopup(new Popup(
        'Update Available', 
        "There's an update available. Would you like to install it now?", 
        PopupType.INSTALL
      )).subscribe((success: boolean) => {
        if (success) { 
          console.log('starting update');
          this.updates.activateUpdate(); 
        }
      });
    });
  }

  private startUpdateAppliedChecker(): void {
    this.updates.activated.subscribe(() => {
      console.log('update got applied');
      document.location.reload();
      this.snackbar.open('App has been updated', 'close', {duration: 1000 * 5});
    });
  }

  private startUpdateChecker(): void {
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    let updateCheckTimer$ = interval(1000 * 30);
    concat(appIsStable$, updateCheckTimer$).subscribe(() => {
      if (this.isOnline && this.updates.isEnabled) {
          console.log('service worker is installed and checking for update');
          this.updates.checkForUpdate();
        } else {
          console.log('not online so cant check');
      }
    });
  }
}
