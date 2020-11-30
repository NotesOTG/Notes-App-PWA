import { Injectable } from '@angular/core';
import { Notes } from 'src/app/shared/models/notes';
import { StorageService, StorageType } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  /**
   * The notes object as an array
   */
  private _notes: Notes[] = new Array();

  constructor(private storage: StorageService) {
    this.getNotesInternal();
  }

  /**
   * Adds the note the array and saves them internally
   * @param note - The note object were adding
   */
  public addNote(note: Notes): void {
    this._notes.push(note);
    this.saveNotesInternal();
  }

  /**
   * Removes the note array and from internal storage
   * @param note - the note were removing
   */
  public removeNote(note: Notes): void {
    for (let i = 0; i < this._notes.length; i++) {
      if (this._notes[i].title === note.title) {
        this._notes.splice(i, 1);
      }
    }
    this.saveNotesInternal();
  }

  /**
   * Will remove all the notes from array and internal storage
   */
  public removeAllNotes(): void {
    this._notes = [];
    this.storage.removeFromStorage(StorageType.NOTES);
  }

  /**
   * Get the notes internally
   */
  private getNotesInternal(): void {
    let internalNotes: Notes[] = this.storage.getFromStorage(StorageType.NOTES);
    if (internalNotes !== undefined || null) {
      this._notes = internalNotes;
    }
  }

  /**
   * Saves the note internally, first removing the notes
   */
  private saveNotesInternal(): void {
    this.storage.removeFromStorage(StorageType.NOTES);
    this.storage.addToStorage(StorageType.NOTES, this._notes);
  }

  /**
   * Parses the modified date to correct formatting
   * @param modifiedDate - the notes modified date
   */
  public getModifiedDate(modifiedDate: number): string {
    if (new Date(modifiedDate).getDay() > new Date(Date.now()).getDay()) {
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

}