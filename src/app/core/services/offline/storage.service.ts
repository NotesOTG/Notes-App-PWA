import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { Notes } from 'src/app/shared/models/notes';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  /**
   * The database object
   */
  private _db: Dexie;

  constructor() {
    this.initializeDB();
  }

  /**
   * Gets the table of the internal DB
   * @param storageType - The type of table were getting
   */
  public getTable(storageType: StorageType) {
    return this._db.table(storageType);
  }

  /**
   * Initializes users browser database
   * First creates the database name
   * Then adds the stores to the databse
   * And maps all the tables to classes(if needed)
   */
  private initializeDB(): void {
    this._db = new Dexie("notes-db");
    this._db.version(1).stores({
      notes: '++id, title, body, checklist, categoory, creationDate, modifiedDate',
      theme: '++, themeColor'
    });

    this._db.table(StorageType.NOTES).mapToClass(Notes);
  }
  
}

/**
 * The type of storages
 */
export enum StorageType {
  THEME = 'theme',
  NOTES = 'notes'
}
