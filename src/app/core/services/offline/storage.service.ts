import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Catergories } from 'src/app/shared/models/categories';
import { Notes } from 'src/app/shared/models/notes';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private _db: Dexie;

  constructor() {
    this._db = new Dexie("notes-db");
    //this._db.delete();
    this._db.version(1).stores({
      notes: '++id, title, body, checklist, categoory, creationDate, modifiedDate',
      theme: '++, themeColor'
    });

    this._db.table(StorageType.NOTES).mapToClass(Notes);
  }

  /**
   * Gets the table of the internal DB
   * @param storageType - The type of table were getting
   */
  public getTable(storageType: StorageType) {
    return this._db.table(storageType);
  }
  
}

/**
 * The type of storages
 */
export enum StorageType {
  THEME = 'theme',
  NOTES = 'notes'
}
