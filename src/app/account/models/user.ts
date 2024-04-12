export class User { 
    id: string 
    email: string;
    password: string;
    confirmPassword: string;

    constructor(id: string,
                email: string,
                password: string,
                confirmPassword: string){
        this.id = id;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}