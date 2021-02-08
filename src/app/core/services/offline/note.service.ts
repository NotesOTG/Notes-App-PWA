import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notes } from 'src/app/shared/models/notes';
import { StateTypes } from 'src/app/shared/models/state-types';
import { StorageService, StorageType } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  /**
   * The notes object as an array
   */
  private _notes: Notes[] = new Array();

  /**
   * The state subject object, takes StateTypes
   */
  private _stateSubject: Subject<StateTypes> = new Subject<StateTypes>();

  /**
   * 
   */
  private _currentNoteId: number = -1;

  constructor(private storage: StorageService) {
    this.getNotesInternal();
  }

  public getNote(noteId: number): Notes {
    return this.notes.find(note => note.id === noteId);
  }

  /**
   * Adds the note the array and saves them internally, returns success or failed
   * @param note - The note object were adding
   */
  public async addNote(note: Notes): Promise<boolean> {
    let save = await this.storage.getTable(StorageType.NOTES).add(note);

    if (save !== (null || undefined)) {
      this._notes.push(note);
    }

    return save !== (null || undefined) ? true: false;
  }

  /**
   * Removes the note array and from internal storage
   * @param note - the note were removing
   */
  public async removeNote(noteId: number, note: Notes): Promise<boolean> {
    let selectedNote: number = this.notes.findIndex(note => note.id === noteId);
    
    if (selectedNote === -1) {
      return false;
    }

    await this.storage.getTable(StorageType.NOTES).delete(noteId);
    this._notes.splice(selectedNote, 1);
    return true;
  }

  /**
   * Attempts to update the note to internal storage and array returns if success or not
   * @param noteId - the id of the note we're updating
   * @param note - the note object we're wanting to update
   */
  public async updateNote(noteId: number, note: Notes): Promise<boolean> {
    let selectedNote: number = this.notes.findIndex(note => note.id === noteId);
    if (selectedNote === -1) {
      return false;
    }

    let save = await this.storage.getTable(StorageType.NOTES).update(noteId, {
      title: note.title,
      body: note.body,
      checklist: note.checklist,
      category: note.category,
      modifiedDate: note.modifiedDate,
      customCategory: note.customCategory,
    });

    if (save === 1) {
      this.notes.splice(selectedNote, 1, note);
    }

    return  save === 1 ? true: false;
  }

  /**
   * Will remove all the notes from array and internal storage
   */
  public async removeAllNotes(): Promise<void> {
    this._notes = [];
    await this.storage.getTable(StorageType.NOTES).clear();
  }

  /**
   * Get the notes internally
   */
  private async getNotesInternal(): Promise<void> {
    let internalNotes: Notes[] = await this.storage.getTable(StorageType.NOTES).toArray();
    if (internalNotes !== (undefined || null)) {
        this._notes = internalNotes;
    }
  }

  /**
   * Parses the modified date to correct formatting
   * @param modifiedDate - the notes modified date
   */
  public getModifiedDate(modifiedDate: number): string {
    if (new Date(modifiedDate).getDay() < new Date(Date.now()).getDay()) {
      return new Date(modifiedDate).toLocaleDateString();
    }
    return new Date(modifiedDate).toLocaleString();
  }

  /**
   * Gets the notes array object
   */
  public get notes(): Notes[] {
    return this._notes;
  }

  /**
   * Gets the state subject object
   */
  public get stateSubject(): Subject<StateTypes> {
    return this._stateSubject;
  }

  public get currentNoteId(): number {
    return this._currentNoteId;
  }
  
  public set currentNoteId(value: number) {
    this._currentNoteId = value;
  }

}