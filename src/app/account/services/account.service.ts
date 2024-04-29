import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable, catchError, map } from "rxjs";
import { BaseService } from "../../services/base.service";

@Injectable()
export class AccountService extends BaseService{

    private httpClinet : HttpClient;

    constructor(httpClient: HttpClient) {
        super();
        this.httpClinet = httpClient;
    }

    public registUser(user: User) : Observable<User> {
        let response = this.httpClinet
                .post(this.UrlServiceV1 + 'nova-conta', user, this.getHeaderJson())
                .pipe(
                    map(this.extractData),
                    catchError(this.HandleError)
                );
        return response;
    }

    public login(user: User) : void {

    }
}