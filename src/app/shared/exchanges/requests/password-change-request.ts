export class PasswordChangeRequest {

    public email: string;
    public password: string;
    public newPassword: string;

    public (email: string, password: string, newPassword: string) {
        this.email = email;
        this.password = password;
        this.newPassword = newPassword;
    }

}