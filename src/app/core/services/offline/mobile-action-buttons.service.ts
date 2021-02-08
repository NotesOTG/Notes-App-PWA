import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ButtonType } from 'src/app/shared/models/button-types';

@Injectable({
  providedIn: 'root'
})
export class MobileActionButtonsService {

  private _showButtons: boolean = false;

  private _buttonEmitter: Subject<boolean> = new Subject<boolean>();

  public buttons: ButtonType[] = [];

  constructor() {
    this.buttonEmitter.subscribe((success: boolean) => {
      if (!success) {
        this.removeButtons();
      }
    });
  }

  public addButtons(buttonType: ButtonType, buttonType2: ButtonType = ButtonType.CANCEL): Observable<boolean> {
    if (this.showButtons) {
      return of(false);
    }

    this.buttons.push(buttonType, buttonType2);
    this._showButtons = true;
    return this.buttonEmitter;
  }

  public removeButtons(): void {
    this._showButtons = false;
    this.buttons = [];
  }

  public get showButtons(): boolean {
    return this._showButtons;
  }

  public get buttonEmitter(): Subject<boolean> {
    return this._buttonEmitter;
  }

}
