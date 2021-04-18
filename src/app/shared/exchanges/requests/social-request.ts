import { SocialTypes } from "../../models/social-types";

export class SocialRequest {

    private socialTypes: SocialTypes;
    private idToken: string;

    constructor(socialTypes: SocialTypes, idToken: string) {
        this.socialTypes = socialTypes;
        this.idToken = idToken;
    }

}