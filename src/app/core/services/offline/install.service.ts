import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InstallService {

  private deferredPrompt: any;

  private _canInstall: boolean = false;

  constructor(private snackBar: MatSnackBar) {
    window.addEventListener('beforeinstallprompt', (event) => {
      this._canInstall = true;
      event.preventDefault();
      this.deferredPrompt = event;
    });

    window.addEventListener('appinstalled', () => {
      this.snackBar.open('Thank you for installing', 'Close');
    });
  }

  startInstall(): void {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        this._canInstall = false;
      }
    });
  }

  public get canInstall(): boolean {
    return this._canInstall;
  }
}
