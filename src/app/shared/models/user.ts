export class User {

    private _email: string;

    private _roles: string[];

    constructor(email: string, roles: string[]) {
        this._email = email;
        this._roles = roles;
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

}