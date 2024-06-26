export class RegisterModel {

    private readonly _name: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _confirmPassword: string;
    
    constructor(name: string, email: string, password: string, confirmPassword: string) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._confirmPassword = confirmPassword;
    }

    get name() : string {
        return this._name; 
    }

    get email() : string {
        return this._email;
    }

    get password() : string {
        return this._password;
    }

    get confirmPassword() {
        return this._confirmPassword;
    }
}