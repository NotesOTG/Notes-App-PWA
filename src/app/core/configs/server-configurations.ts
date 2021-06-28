import { isDevMode } from "@angular/core";

export class ServerConfigurations {

    public static PRODUCTION: boolean = !isDevMode();

    public static readonly PREFIX: string = 'api/';

    public static readonly PUBLICLINK: string = ServerConfigurations.PRODUCTION ? 
        'https://notesotg.com/' + ServerConfigurations.PREFIX : 
        'https://localhost:44361/' + ServerConfigurations.PREFIX;
        
}