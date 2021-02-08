export class JwTokens {

    private _refreshToken: string = undefined;

    private _primaryToken: string = undefined;

    constructor(primaryToken: string, refreshToken: string) {
        this.primaryToken = primaryToken;
        this.refreshToken = refreshToken;
    }

    public get refreshToken(): string {
        return this._refreshToken;
    }

    public set refreshToken(value: string) {
        this._refreshToken = value;
    }

    public get primaryToken(): string {
        return this._primaryToken;
    }

    public set primaryToken(value: string) {
        this._primaryToken = value;
    }

}