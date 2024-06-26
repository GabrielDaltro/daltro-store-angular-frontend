export class RegisterRequestDTO { 
    
    public readonly id: string;
    public readonly name: string; 
    public readonly email: string;
    public readonly password: string;
    public readonly confirmPassword: string;

    constructor(id: string, name: string, email: string, password: string, confirmPassword: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}