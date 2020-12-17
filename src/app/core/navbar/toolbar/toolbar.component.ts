import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Popup, PopupType } from 'src/app/shared/models/popup';
import { StateTypes } from 'src/app/shared/models/state-types';
import { NoteService } from '../../services/offline/note.service';
import { PopupService } from '../../services/offline/popup.service';
import { ThemeService, ThemeType } from '../../services/offline/theme.service';
import { HandleUnrecoverableStateService } from '../../services/online/handle-unrecoverable-state.service';

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
    public handle: HandleUnrecoverableStateService
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

  public createAndNavigateNotes() {
    if (this.router.url !== '/notes') {
      this.router.navigateByUrl('/notes');
    }
    setTimeout(() => {
      this.noteService.stateSubject.next(StateTypes.CREATE);
    }, 50);
  }

  public showInstall() {
    this.popup.showPopup(new Popup(
      'Install Notes App', 
      'Would you like to install the notes app?',
      PopupType.INSTALL
      )).subscribe((success: boolean) => {
    });
  }

  public get notesActionBar() {
    return this._notesActionBar;
  }

}
