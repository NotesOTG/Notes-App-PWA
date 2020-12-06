import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  public AddNoteForm: FormGroup;

  public note: Notes;

  public formEditable: boolean = false;

  constructor(
    public noteService: NoteService, 
    public router: Router, 
    private fb: FormBuilder
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

    this.AddNoteForm = this.fb.group({
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
    let note = new Notes(this.title.value, this.body.value, false, this.category.value, this.isCustomCategory);
    if (note.creationDate == undefined || null) {
      note.creationDate = new Date().toLocaleDateString();
    }

    this.noteService.addNote(note);
  }

  /**
   * Gets the title object from the form
   */
  get title() {
    return this.AddNoteForm.get('title');
  }

  /**
   * Gets the category object from the form
   */
  get category() {
    return this.AddNoteForm.get('category');
  }

  /**
   * Gets the body object from the form
   */
  get body () {
    return this.AddNoteForm.get('body');
  }

}
