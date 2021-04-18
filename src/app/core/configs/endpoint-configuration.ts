import { ServerConfigurations } from "./server-configurations";

export class EndPointsConfiguration {

    //Controller prefixes
    private static readonly AUTHURL: string = ServerConfigurations.PUBLICLINK + 'auth';

    //Auth Endpoints
    public static readonly REGISTERURL: string = EndPointsConfiguration.AUTHURL + '/Register';
    public static readonly LOGINURL: string = EndPointsConfiguration.AUTHURL + '/Login';
    public static readonly CHECKEMAIL: string = EndPointsConfiguration.AUTHURL + '/CheckEmail?email=';
    public static readonly SOCIALOGIN: string = EndPointsConfiguration.AUTHURL + '/SocialLogin';
}