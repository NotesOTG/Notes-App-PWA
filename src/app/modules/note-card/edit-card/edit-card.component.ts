import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/services/offline/note.service';
import { Catergories } from 'src/app/shared/models/categories';
import { Notes } from 'src/app/shared/models/notes';
import { StateTypes } from 'src/app/shared/models/state-types';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

 /**
   * The categories array for html
   */
  public categories = [];

  /**
   * Is it a custom category for the html
   */
  public isCustomCategory: boolean;
  
  /**
   * The form group for the notes form
   */
  public editNoteForm: FormGroup;

  public note: Notes;

  public formEditable: boolean = false;

  constructor(
    public noteService: NoteService, 
    public router: Router, 
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.categories = Object.values(Catergories);
  }

  async ngOnInit(): Promise<void> {
    this.note = this.noteService.getNote(this.noteService.currentNoteId);
    if (this.note === (null || undefined)) {
      this.noteService.stateSubject.next(StateTypes.DEFAULT);
      return;
    }

    this.isCustomCategory = this.note.customCategory;
    this.editNoteForm = this.fb.group({
      title: new FormControl({value: this.note.title, disabled: true}, [Validators.required, Validators.minLength(3)]),
      body: new FormControl({value: this.note.body, disabled: true}, [Validators.required, Validators.minLength(3)]),
      category: new FormControl({value: this.note.category, disabled: true}, [Validators.required, Validators.minLength(2)])
    });

  }

  /**
   * Was the custom category button clicked
   */
  public customCategoryClicked() {
    if (!this.formEditable) {
      return;
    }

    this.isCustomCategory = !this.isCustomCategory;
    this.isCustomCategory ? 
    this.category.setValue('') :
    this.category.setValue(Catergories.NONE);
  }

  /**
   * Checks if the form is editable on click
   */
  public editFormCheck(): void {
    if (!this.formEditable) {
      this.formEditable = true;
      this.title.enable();
      this.body.enable();
      this.category.enable();
    }
  }

  /**
   * The submit method for the form
   */
  public onSubmit() {
    this.note.title = this.title.value;
    this.note.body = this.body.value;
    this.note.category = this.category.value;
    this.note.customCategory = this.isCustomCategory;
    this.note.modifiedDate = Date.now();
    let result = this.noteService.updateNote(this.noteService.currentNoteId, this.note);
    if (result) {
      this.snackbar.open('Your note has been saved', 'close', {duration: 1000 * 5});
      this.noteService.stateSubject.next(StateTypes.DEFAULT);
    } else {
      this.snackbar.open("Your note couldn't be saved", 'close', {duration: 1000 * 5});
    }
  }

  public actionButton(event: boolean): void {
    if (event) {
      if (this.editNoteForm.touched && this.editNoteForm.errors !== null) {
        this.onSubmit();
      }
      this.editNoteForm.markAllAsTouched();
    } else {
      this.noteService.stateSubject.next(StateTypes.DEFAULT);
    }
  }

  /**
   * Gets the title object from the form
   */
  get title() {
    return this.editNoteForm.get('title');
  }

  /**
   * Gets the category object from the form
   */
  get category() {
    return this.editNoteForm.get('category');
  }

  /**
   * Gets the body object from the form
   */
  get body () {
    return this.editNoteForm.get('body');
  }

}
