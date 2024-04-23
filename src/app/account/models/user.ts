export class User { 
    id: string;
    name: string; 
    email: string;
    password: string;
    confirmPassword: string;

    constructor(id: string,
                name: string,
                email: string,
                password: string,
                confirmPassword: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}