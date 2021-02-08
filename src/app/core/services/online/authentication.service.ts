import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { JwtHandler } from '../../handlers/jwt-handler';
import { UserHandler } from '../../handlers/user-handler';
import { StorageService } from '../offline/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userHandler: UserHandler = null;

  private _jwtHandler: JwtHandler = null;

  constructor(private storage: StorageService) {
    this._userHandler = new UserHandler(storage).loadUserInternal();
    this._jwtHandler = new JwtHandler(storage).loadTokensInternal();
  }

  

}
