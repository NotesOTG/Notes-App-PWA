import { JwTokens } from "src/app/shared/models/jwtokens";
import { StorageService, StorageType } from "../services/offline/storage.service";

export class JwtHandler {

    private _jwtTokens: JwTokens;

    private storage: StorageService;

    constructor(storage: StorageService) {
        this.storage = storage;
    }

    public loadTokensInternal(): JwtHandler {
        this.storage.getTable(StorageType.JWTOKENS).get(0).then(val => {
            if (val == null) {
                this._jwtTokens = new JwTokens(null, null);
            } else {
                this._jwtTokens = val;
            }
        });
        return this;
    }

    public async updateTokens(primaryToken: string, refreshToken: string): Promise<void> {
        this.jwtTokens.primaryToken = primaryToken;
        this.jwtTokens.refreshToken = refreshToken;
        await this.storage.getTable(StorageType.JWTOKENS).clear();
        await this.storage.getTable(StorageType.JWTOKENS).add(this.jwtTokens, 0);
    }

    public hasTokens(): boolean {
        if (this.jwtTokens == null) { 
            return false; 
        }

        return this.jwtTokens.refreshToken == null && this.jwtTokens.primaryToken == null;
    }

    public async removeTokens(): Promise<void> {
        this.jwtTokens.primaryToken = null;
        this.jwtTokens.refreshToken = null;
        await this.storage.getTable(StorageType.JWTOKENS).clear();
    }

    public get jwtTokens(): JwTokens {
        return this._jwtTokens;
    }

}