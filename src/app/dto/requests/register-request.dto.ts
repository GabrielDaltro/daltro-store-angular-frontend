export class RegisterRequestDTO { 
    
    public readonly name: string; 
    public readonly email: string;
    public readonly password: string;
    public readonly confirmPassword: string;

    constructor(name: string, email: string, password: string, confirmPassword: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}