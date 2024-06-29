import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterModel } from "../models/register.model";
import { UserModel } from "../models/user.model";
import { Observable, catchError, map, tap } from "rxjs";
import { BaseService } from "./base.service";
import { LoginModel } from "../models/login.model";
import { TokenInfoModel } from "../models/tokenInfo.model";
import { ClaimModel } from "../models/claim.model";

@Injectable({providedIn: 'root'})
export class AccountService extends BaseService {

    private httpClinet : HttpClient;

    constructor(httpClient: HttpClient) {
        super();
        this.httpClinet = httpClient;
    }

    public registUser(registerModel: RegisterModel) : Observable<UserModel> {
        let response = this.httpClinet
                .post(this.UrlServiceV1 + 'auth/create-account', registerModel, this.getHeaderJson())
                .pipe(
                    map(this.extractData),
                    tap((user: UserModel) => {}),
                    catchError(this.HandleError)
                );
        return response;
    }

    public extractData() : UserModel {
        return new UserModel("", "", "", new TokenInfoModel("",0), []);
    }

    public logout() : void {
        this.localStorage.cleanLocalUserData();
    }

    public login(loginModel: LoginModel) : void {
        return;
    }

    public isLoggedIn() : boolean {
        const userToken = this.localStorage.getUserToken();
        const result : boolean = userToken != 'undefined' && userToken !== null; 
        return result;
    }

    public getUserName() : string | null {
        const user = this.localStorage.getUser();
        return user != null? user.name : null;
    }
}