import { User } from "../account/models/user";

export class LocalStorageUtils {

    public getUser() : User | null {
        const jsonUser = localStorage.getItem('daltrostore.user');
        if (jsonUser == null) return null;
        return JSON.parse(jsonUser);
    }

    public saveLocalUserData(response: any) {
        this.saveUserToken(response.accessToken);
        this.saveUser(response.userToken);
    }

    public cleanLocalUserData() {
        localStorage.removeItem("daltrostore.token");
        localStorage.removeItem("daltrostore.user");
    }

    public getUserToken() :string | null {
        return localStorage.getItem("daltrostore.token");
    }

    public saveUserToken(token: string) {
        localStorage.setItem("daltrostore.token", token);
    }

    public saveUser(user: string) {
        localStorage.setItem("daltrostore.user", JSON.stringify(user));
    }
}