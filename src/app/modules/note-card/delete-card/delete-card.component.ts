import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { Notes } from 'src/app/shared/models/notes';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent implements OnInit {

  public note: Notes;

  constructor(private noteService: NoteService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.note = this.noteService.getNote(this.noteService.currentNoteId);
    if (this.note === (null || undefined)) {
      this.noteService.stateSubject.next(StateTypes.DEFAULT);
      return;
    }
  }

  public cancel() {
    this.noteService.stateSubject.next(StateTypes.DEFAULT);
  }

  public remove() {
    let deleted = this.noteService.removeNote(this.noteService.currentNoteId, this.note);
    if (deleted) {
      this.snack.open('Note was deleted', 'close', {duration: 1000 * 5});
      this.noteService.stateSubject.next(StateTypes.DEFAULT);
    } else {
      this.snack.open("Note couldn't be deleted", 'close', {duration: 1000 * 5});
    }
  }

}
