import { BasicResponse } from "../basic-reponse";

export interface TokenResponse extends BasicResponse {

    primaryToken: string;
    refreshToken: string;

}