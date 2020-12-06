import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.scss']
})
export class TimeCardComponent implements OnInit {

  //TODO: Add way to get view-port div to apply background-color, couldn't becuase of ngIf

  currentState = StateTypes.DEFAULT;

  states = StateTypes;

  constructor(public noteService: NoteService, public router: Router) { }

  ngOnInit(): void {
    this.noteService.stateSubject.subscribe((state: StateTypes) => {
      console.log('currentstate: ', state);
      this.currentState = state;
      if (state === StateTypes.DEFAULT || state === StateTypes.CREATE) {
        this.noteService.currentNoteId = -1;
      }
    });
  }

  public addState(newState: StateTypes) {
    this.noteService.stateSubject.next(newState);
  }

}
