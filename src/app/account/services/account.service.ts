import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable()
export class AccountService{

    private httpClinet : HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClinet = httpClient;
    }

    public registUser(user: User) : void {

    }

    public login(user: User) : void {

    }
}