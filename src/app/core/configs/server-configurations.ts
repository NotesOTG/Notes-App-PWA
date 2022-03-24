import { isDevMode } from "@angular/core";
import { environment } from "src/environments/environment";

export class ServerConfigurations {

    public static PRODUCTION: boolean = environment.production;

    public static readonly PREFIX: string = 'api/';

    public static readonly PUBLICLINK: string = ServerConfigurations.PRODUCTION ? 
        'https://notesotg.com/' + ServerConfigurations.PREFIX : 
        'https://localhost:44361/' + ServerConfigurations.PREFIX;
        
}