import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { InternetStatusService } from './internet-status.service';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';
import { PopupService } from '../offline/popup.service';
import { Popup, PopupType } from 'src/app/shared/models/popup';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  /**
   * The interstatus service object
   */
  private internetStatus: InternetStatusService;

  /**
   * The application refrence object
   */
  private appRef: ApplicationRef;

  /**
   * The Service Worker Update object
   */
  private updates: SwUpdate;

  /**
   * The popup service so we can get user input
   */
  private popupService: PopupService;

  /**
   * is the user online
   */
  private isOnline = false;

  /**
   * Tells us if the user doesn't want to apply the update
   */
  private silentUpdate = false;

  constructor(private injector: Injector) {
    this.internetStatus = this.injector.get(InternetStatusService);
    this.updates = this.injector.get(SwUpdate);
    this.popupService = this.injector.get(PopupService);
  }

  /**
   * Initializes the service and starts the checkers
   */
  public initService() {
    this.appRef = this.injector.get(ApplicationRef);
    
    this.internetStatus.onlineSubject.subscribe((online: boolean) => {
      this.isOnline = online;
    });

    this.startUpdateChecker();
    this.startUpdateAvailableChecker();
    this.startUpdateAppliedChecker();
  }

  /**
   * Checks for available updates
   * And then prompts the user to install update
   * Or silently updates
   */
  private startUpdateAvailableChecker(): void {
    this.updates.available.subscribe(() => {
      if (this.silentUpdate) {
        this.updates.activateUpdate();
        return;
      }

      this.popupService.showPopup(new Popup(
        'Update Available', 
        "There's an update available. Would you like to install it now?", 
        PopupType.INSTALL
      )).subscribe((success: boolean) => {
        if (success) {
          this.updates.activateUpdate(); 
        } else {
          this.silentUpdate = true;
          this.updates.activateUpdate(); 
        }
      });
    });
  }

  /**
   * Starts listening for if the update was installed
   * Reloads the document if installed
   * If silent update is on. Doesn't reload the document
   */
  private startUpdateAppliedChecker(): void {
    this.updates.activated.subscribe(() => {
      if (!this.silentUpdate) { document.location.reload(); }
    });
  }

  /**
   * Checks for updates periodically(every 5 minutes)
   */
  private startUpdateChecker(): void {
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    let updateCheckTimer$ = interval(1000 * 60 * 5);
    concat(appIsStable$, updateCheckTimer$).subscribe(() => {
      if (this.isOnline && this.updates.isEnabled) { this.updates.checkForUpdate(); }
    });
  }
}
