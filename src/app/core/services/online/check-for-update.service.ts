import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { InternetStatusService } from './internet-status.service';
import { concatAll, concatMap, first, map, switchMap, switchMapTo } from 'rxjs/operators';
import { interval, concat, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  private internetStatus: InternetStatusService;
  public appRef: ApplicationRef;
  private updates: SwUpdate;

  private isOnline = false;
  private futureTime = Date.now() + (1000 * 45);

  constructor(private injector: Injector) {
    this.internetStatus = this.injector.get(InternetStatusService);
    this.updates = this.injector.get(SwUpdate);
  }

  public initService() {
    this.appRef = this.injector.get(ApplicationRef);
    
    this.internetStatus.onlineSubject.subscribe((online: boolean) => {
      this.isOnline = true;
    });

    let firstCheck = Date.now();
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    let afkCheck = interval(1000 * 1);
    let stable = afkCheck.pipe(
      switchMapTo(appIsStable$)
    );

    // afkCheck.subscribe(() => {
    //   this.appRef.isStable.subscribe((stable: boolean) => {
    //     console.log('state has changed. Were checking');
    //     if (Date.now() > this.futureTime && this.isOnline) {
    //       if (stable) {
    //         console.log('yes were stable');
    //       }
    //       this.futureTime = Date.now() + (1000 * 45);
    //       console.log('resetting time');
    //     }
    //   });
    // });

    stable.subscribe(data => {
      console.log('data', data);
    })

    // setInterval(() => {
    //   if (Date.now() > firstCheck + 30000) {
    //     console.log('Its been 30 seconds');
    //     firstCheck = Date.now();
    //   } else {
    //     console.log('still hasnt been 30seconds');
    //   }
    // }, 1000);



    //create dummy interval that will check for updates here and there. Cant with setInterval running constantly.....
    //could use currentTimeMillis on every check when it returns true

  }
}
