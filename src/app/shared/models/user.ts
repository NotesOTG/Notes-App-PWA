export class User {

    private _email: string;

    private _roles: string[];

    private _hasPassword: boolean;

    constructor(email: string, roles: string[], hasPassword: boolean) {
        this._email = email;
        this._roles = roles;
        this._hasPassword = hasPassword;
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

    public get hasPassword_1(): boolean {
        return this._hasPassword;
    }
    public set hasPassword_1(value: boolean) {
        this._hasPassword = value;
    }

}