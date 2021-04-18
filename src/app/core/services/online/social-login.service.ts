import { EventEmitter, Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { SocialRequest } from 'src/app/shared/exchanges/requests/social-request';
import { LoginResponse } from 'src/app/shared/exchanges/responses/impl/login-response';
import { SocialTypes } from 'src/app/shared/models/social-types';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

/**
 * The login service to handle social logins
 * We call the startLogin and feed it the type of social network we are using
 * Prompts the user in the web page to login
 * And lastly returns the emitter containing the login response,
 * that we dispatched to the server
 */
export class SocialLoginService {

  /**
   * The emitter that it listened to for the login response
   */
  private emitter: EventEmitter<LoginResponse> = new EventEmitter<LoginResponse>();

  /**
   * The enum containing the social types
   */
  private socialTypes: SocialTypes;

  /**
   * Subscribes to the auth service, and dispatches the social data to the server
   * Then sends a emit we are listening to with the loginresponse
   * @param socialService The social service we are using
   * @param authService The auth service we are using
   */
  constructor(private socialService: SocialAuthService, private authService: AuthenticationService) {
    this.socialService.authState.subscribe((data: SocialUser) => {
      if (data?.idToken != null || data.idToken?.length > 0) {
        return this.authService.socialLogin(new SocialRequest(this.socialTypes, data.idToken)).subscribe(response => {
          this.emitter.emit(response);
        });
      }
      this.emitter.emit(null);
    });
  }

  /**
   * Prompts the user to login to the social network
   * Then returns the login response emitter
   * @param socialTypes The social network we are using
   * @returns Returns the emitter for the login response
   */
  startLogin(socialTypes: SocialTypes): Observable<LoginResponse> {
    this.socialTypes = socialTypes;
    switch(socialTypes) {
      case SocialTypes.GOOGLE:
        this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);

      case SocialTypes.FACEBOOK:

      case SocialTypes.MICROSOFT:

      return this.emitter;
    }
  }

}
