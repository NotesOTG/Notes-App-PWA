import { BasicResponse } from "../basic-reponse";

export interface RegisterResponse extends BasicResponse {
    DisplayNameError: string; 
    EmailError: string;
    PasswordError: string;
}