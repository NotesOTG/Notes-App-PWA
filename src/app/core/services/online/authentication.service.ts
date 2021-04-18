import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from 'src/app/shared/exchanges/requests/login-request';
import { RegisterRequest } from 'src/app/shared/exchanges/requests/register-request';
import { SocialRequest } from 'src/app/shared/exchanges/requests/social-request';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';
import { LoginResponse } from 'src/app/shared/exchanges/responses/impl/login-response';
import { RegisterResponse } from 'src/app/shared/exchanges/responses/impl/register-response';
import { User } from 'src/app/shared/models/user';
import { EndPointsConfiguration } from '../../configs/endpoint-configuration';
import { JwtHandler } from '../../handlers/jwt-handler';
import { UserHandler } from '../../handlers/user-handler';
import { StorageService } from '../offline/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * The user handler object
   */
  private _userHandler: UserHandler = null;

  /**
   * The jwt handler for Javascript Web Tokens
   */
  private _jwtHandler: JwtHandler = null;

  constructor(private storage: StorageService, public http: HttpClient) {}

  /**
   * Used to initialize the service to load the data
   * This is found in app.module.ts
   */
  public initService() {
    this._userHandler = new UserHandler(this.storage).loadUserInternal();
    this._jwtHandler = new JwtHandler(this.storage).loadTokensInternal();
  }

  /**
   * Checks if the email is taken
   * @param email The email to check
   */
  public checkEmail(email: string) : Observable<BasicResponse> {
    return this.http.get<BasicResponse>(
      EndPointsConfiguration.CHECKEMAIL + email
    );
  }

  /**
   * Dispatches the register request to the server
   * @param request The register request
   * @returns The register response observable
   */
  public register(request: RegisterRequest) : Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      EndPointsConfiguration.REGISTERURL,
      request
    );
  }

  /**
   * Dispatches the login request to the server
   * Taps into the response, and saves the user data and jw tokens
   * @param request The login request
   * @returns The login response observable
   */
  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      EndPointsConfiguration.LOGINURL,
      request
    ).pipe(tap((response: LoginResponse) => {
      if (!response.success) {
        return;
      }

      this._userHandler.addUser(new User(response.email, response.roles));
      this._jwtHandler.updateTokens(response.token, response.refreshToken);
    }));
  }

  /**
   * Dispatches the social request to the server
   * Taps into the response, and saves the user data and jw tokens
   * @param socialRequest The social Request
   * @returns The Login response observable
   */
  public socialLogin(socialRequest: SocialRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      EndPointsConfiguration.SOCIALOGIN,
      socialRequest
    ).pipe(tap((response: LoginResponse) => {
      if (!response.success) {
        return;
      }
      this._userHandler.addUser(new User(response.email, response.roles));
      this._jwtHandler.updateTokens(response.token, response.refreshToken);
    }));
  }

  /**
   * Gets the user handler object
   */
  public get UserHandler(): UserHandler {
    return this._userHandler;
  }

  /**
   * Gets the JW Token handler object
   */
  public get JWTHandler(): JwtHandler {
    return this._jwtHandler;
  }

}
