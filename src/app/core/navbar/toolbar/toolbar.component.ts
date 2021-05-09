import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';
import { ButtonType } from 'src/app/shared/models/button-types';
import { Popup } from 'src/app/shared/models/popup';
import { StateTypes } from 'src/app/shared/models/state-types';
import { InstallService } from '../../services/offline/install.service';
import { NoteService } from '../../services/offline/note.service';
import { PopupService } from '../../services/offline/popup.service';
import { ThemeService, ThemeType } from '../../services/offline/theme.service';
import { AuthenticationService } from '../../services/online/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public ThemeType = ThemeType;

  private _notesActionBar = false;

  public stateTypes = StateTypes;

  constructor(
    public themeService: ThemeService, 
    public noteService: NoteService,
    private router: Router,
    public popup: PopupService,
    public installService: InstallService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        switch(event.urlAfterRedirects) {
          case '/notes':
            this._notesActionBar = true;
          break;

          default:
            this._notesActionBar = false;
            break;
        }
      }
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public createAndNavigateNotes() {
    if (this.router.url !== '/notes') {
      this.router.navigateByUrl('/notes');
    }
    setTimeout(() => {
      this.noteService.stateSubject.next(StateTypes.CREATE);
    }, 50);
  }

  public promptInstall() {
    this.popup.showPopup(new Popup(
      'Install Notes App', 
      'You will have full access to creating, viewing, editing, and deleting notes on the go. Even without an internet connection.',
      ButtonType.INSTALL
      )).subscribe((success: boolean) => {
        if (success) {
          this.installService.startInstall();
        }
    });
  }

  public get notesActionBar() {
    return this._notesActionBar;
  }

}
