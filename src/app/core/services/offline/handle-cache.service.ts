import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class HandleCacheService {

  private cacheKeys: string[];

  constructor(private update: SwUpdate) {}

  /**
   * Initializes service, and listens for if update available
   */
  public initService() {
    this.getCurrentKeys();

    this.update.available.subscribe(() => {
      this.deleteCurrentKeys();
      this.getCurrentKeys();
    });
  }

  /**
   * Gets the current keys in the cache with 5 second execution delay
   */
  private getCurrentKeys(): void {
    setTimeout(() => {
      window.caches.keys().then(keyList => {
        this.cacheKeys = keyList;
      });
    }, 5000);
  }

  /**
   * Delete all of the current keys that was recorded except for the db control
   */
  private deleteCurrentKeys(): void {
    for(let i = 0; i < this.cacheKeys.length; i++) {
      if (this.cacheKeys[i] === 'ngsw:/:db:control') {
        continue;
      }
      window.caches.delete(this.cacheKeys[i]);
    }
  }

}
