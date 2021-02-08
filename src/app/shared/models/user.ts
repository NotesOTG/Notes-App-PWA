export class User {

    private _email: string;

    private _username: string;

    constructor(email: string, username: string) {
        this._email = email;
        this._username = username;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

}