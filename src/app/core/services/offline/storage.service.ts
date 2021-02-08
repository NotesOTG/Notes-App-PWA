import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { JwTokens } from 'src/app/shared/models/jwtokens';
import { Notes } from 'src/app/shared/models/notes';
import { User } from 'src/app/shared/models/user';

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
    this._db.version(2).stores({
      notes: '++id, title, body, checklist, categoory, creationDate, modifiedDate, customCategory',
      theme: '++, themeColor',
      jwTokens: '++, primaryToken, secondaryToken',
      user: '++, email, username'
    });

    this._db.table(StorageType.NOTES).mapToClass(Notes);
    this._db.table(StorageType.JWTOKENS).mapToClass(JwTokens);
    this._db.table(StorageType.USER).mapToClass(User);
  }
  
}

/**
 * The type of storages
 */
export enum StorageType {
  THEME = 'theme',
  NOTES = 'notes',
  JWTOKENS = 'jwTokens',
  USER = 'user'
}
