import { BasicResponse } from "../basic-reponse";

export interface NoteResponse extends BasicResponse {
    title: string;
    body: string;
    publicId: string;
    creationDate: string;
    modifiedDate: string;
    checkList: boolean;
    category: string
    customCategory:boolean
}