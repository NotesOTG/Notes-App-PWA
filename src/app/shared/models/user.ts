export class User {

    private _email: string;

    private _roles: string[];

    private _hasPassword: boolean;

    private _emailVerified: boolean;

    constructor(email: string, roles: string[], hasPassword: boolean, emailVerified: boolean) {
        this._email = email;
        this._roles = roles;
        this._hasPassword = hasPassword;
        this._emailVerified = emailVerified;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get roles(): string[] {
        return this._roles;
    }

    public set roles(value: string[]) {
        this._roles = value;
    }

    public hasRole(role: string): boolean {
        return this.roles.find(r => r == role) != null;
    }

    public getRole(role: string): string {
        return this.roles.find(r => r == role);
    }

    public get hasPassword(): boolean {
        return this._hasPassword;
    }

    public set hasPassword(value: boolean) {
        this._hasPassword = value;
    }

    public get emailVerified(): boolean {
        return this._emailVerified;
    }

    public set emailVerified(value: boolean) {
        this._emailVerified = value;
    }

}