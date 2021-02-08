import { ServerConfigurations } from "./server-configurations";

export class EndPointsConfiguration {

    //Controller prefixes
    private static readonly AUTHURL: string = ServerConfigurations.PUBLICLINK + 'auth';

    //Auth Endpoints
    public static readonly REGISTERURL: string = EndPointsConfiguration.AUTHURL + '/Register';

}