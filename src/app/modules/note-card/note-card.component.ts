import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SiteConfigurations } from 'src/app/core/configs/site-configurations';
import { MobileActionButtonsService } from 'src/app/core/services/offline/mobile-action-buttons.service';
import { NoteService } from 'src/app/core/services/note.service';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  //TODO: Add way to get view-port div to apply background-color, couldn't becuase of ngIf

  currentState = StateTypes.DEFAULT;

  states = StateTypes;

  constructor(
    public noteService: NoteService, 
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private maService: MobileActionButtonsService
  ) { }

  ngOnInit(): void {
    document.title = SiteConfigurations.TTILE + 'Notes';

    this.noteService.stateSubject.subscribe((state: StateTypes) => {
      this.currentState = state;
      this.maService.removeButtons();
      if (state === StateTypes.DEFAULT || state === StateTypes.CREATE) {
        this.noteService.currentNoteId = -1;
      }
    });

    if (this.activatedRoute.snapshot.queryParams.action === 'create') {
      this.noteService.stateSubject.next(StateTypes.CREATE);
    }
  }

}
