import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss']
})
export class ViewCardComponent implements OnInit {

  /**
   * Object for the state types for the html
   */
  states = StateTypes;

  constructor(public noteService: NoteService) {}
  
  ngOnInit(): void {
  }

  /**
   * This will start a new state, and store the id
   * @param newState - The state we will switch to
   * @param id - the id of the note we're using
   */
  addStateAndId(newState: StateTypes, id: number) {
    this.noteService.currentNoteId = id;
    this.noteService.stateSubject.next(newState);
  }
  
  public addState(newState: StateTypes) {
    this.noteService.stateSubject.next(newState);
  }

  /**
   * Cuts the text if over 126 characters, and returns the string
   * @param text - The text to cut
   */
  public cutText(text: string): string {
    if (text.length >= 127) {
      return text.substr(0, 127).concat('...');
    }
    return text;
  }

}
