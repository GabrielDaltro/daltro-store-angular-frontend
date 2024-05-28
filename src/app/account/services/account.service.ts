import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable, catchError, map, tap } from "rxjs";
import { BaseService } from "../../services/base.service";

@Injectable()
export class AccountService extends BaseService {

    private httpClinet : HttpClient;

    constructor(httpClient: HttpClient) {
        super();
        this.httpClinet = httpClient;
    }

    public registUser(user: User) : Observable<User> {
        let response = this.httpClinet
                .post(this.UrlServiceV1 + 'auth/create-account', user, this.getHeaderJson())
                .pipe(
                    map(this.extractData),
                    tap((user: User) => {}),
                    catchError(this.HandleError)
                );
        return response;
    }

    public logout() : void {
        this.localStorage.cleanLocalUserData();
    }

    public login(user: User) : void {

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