import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicResponse } from 'src/app/shared/exchanges/responses/basic-reponse';
import { EndPointsConfiguration } from '../../configs/endpoint-configuration';

@Injectable({
  providedIn: 'root'
})
/**
 * This service for the user routes for the server
 */
export class ServerUserService {

  constructor(public http: HttpClient) { }

  /**
   * Tries to confirm the email toke with the backed
   */


  //Working on getting emailToken correctly.
  public confirmEmail(token: string): Observable<BasicResponse> {
    return this.http.post<BasicResponse>(
      EndPointsConfiguration.CONFIRMEMAIL,
      JSON.stringify(token),
    );
  }

  public verifiedEmail(): Observable<BasicResponse> {
    return this.http.get<BasicResponse>(
      EndPointsConfiguration.VERIFIEDEMAIL
    );
  }

  public resendVerificationEmail(): Observable<BasicResponse> {
    return this.http.get<BasicResponse>(
      EndPointsConfiguration.ISSUEEMAILTOKEN
    );
  }

}
