import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PopupDialogComponent } from 'src/app/shared/components/popup-dialog/popup-dialog.component';
import { Popup } from 'src/app/shared/models/popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  public showPopup(popup: Popup): Observable<boolean> {
    return this.dialog.open(PopupDialogComponent, {
      data: { title: popup.title, body: popup.body, action: popup.action },
      closeOnNavigation: true,
      autoFocus: true,
    }).afterClosed();
  }
}
