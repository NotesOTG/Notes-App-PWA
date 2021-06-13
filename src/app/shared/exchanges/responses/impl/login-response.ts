import { BasicResponse } from "../basic-reponse";

export interface LoginResponse extends BasicResponse {

    email: string;
    token: string;
    refreshToken: string;
    roles: string[];
    hasPassword: boolean;
    emailVerified: boolean;

}