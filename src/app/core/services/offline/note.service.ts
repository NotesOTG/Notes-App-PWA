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

  constructor(private storage: StorageService) {
    this.getNotesInternal();
  }

  /**
   * Adds the note the array and saves them internally
   * @param note - The note object were adding
   */
  public addNote(note: Notes): void {
    this._notes.push(note);
    this.storage.getTable(StorageType.NOTES).put(note);
  }

  /**
   * Removes the note array and from internal storage
   * @param note - the note were removing
   */
  public async removeNote(note: Notes): Promise<void> {
    for (let i = 0; i < this._notes.length; i++) {
      if (this._notes[i].title === note.title) {
        this._notes.splice(i, 1);
        await this.storage.getTable(StorageType.NOTES).delete(this._notes[i].id);
      }
    }
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
        console.log(internalNotes[0].title);
    }
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

  /**
   * Gets the state subject object
   */
  public get stateSubject(): Subject<StateTypes> {
    return this._stateSubject;
  }

}