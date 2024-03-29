import { ServerConfigurations } from "./server-configurations";

export class EndPointsConfiguration {

    //Controller prefixes
    private static readonly AUTHURL: string = ServerConfigurations.PUBLICLINK + 'auth';
    private static readonly USERURL: string = ServerConfigurations.PUBLICLINK + 'user';
    private static readonly NOTEURL: string = ServerConfigurations.PUBLICLINK + 'notes';

    //Auth Endpoints
    public static readonly REGISTERURL: string = EndPointsConfiguration.AUTHURL + '/Register';
    public static readonly LOGINURL: string = EndPointsConfiguration.AUTHURL + '/Login';
    public static readonly CHECKEMAIL: string = EndPointsConfiguration.AUTHURL + '/CheckEmail?email=';
    public static readonly SOCIALOGIN: string = EndPointsConfiguration.AUTHURL + '/SocialLogin';
    public static readonly LOGOUTURL: string = EndPointsConfiguration.AUTHURL + '/Logout?refreshToken=';
    public static readonly REFRESHTOKENS: string = EndPointsConfiguration.AUTHURL + '/refreshTokens';

    //User Endpoints
    public static readonly CHANGEPASSWORD: string = EndPointsConfiguration.USERURL + '/changePassword';
    public static readonly VERIFIEDEMAIL: string = EndPointsConfiguration.USERURL + '/verifiedEmail';
    public static readonly ISSUEEMAILTOKEN: string = EndPointsConfiguration.USERURL + '/IssueEmailToken';
    public static readonly CONFIRMEMAIL: string = EndPointsConfiguration.USERURL + '/confirmEmail';

    //Note Endpoints
    public static readonly ADDNOTE: string = EndPointsConfiguration.NOTEURL + '/addNote';
    public static readonly REMOVENOTE: string = EndPointsConfiguration.NOTEURL + '/deleteNote?publicNoteId=';
    public static readonly UPDATENOTE: string = EndPointsConfiguration.NOTEURL + '/updateNote';
}