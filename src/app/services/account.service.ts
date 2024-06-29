import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterModel } from "../models/register.model";
import { UserModel } from "../models/user.model";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { BaseService } from "./base.service";
import { LoginModel } from "../models/login.model";
import { RegisterMapperService } from "./mappers/register-mapper.service";
import { LoginMapperService } from "./mappers/login-mapper.service";
import { LoginResponseDTO } from "../dto/responses/login-response.dto";
import { RegisterResponseDTO } from "../dto/responses/register-response.dto";

@Injectable({providedIn: 'root'})
export class AccountService extends BaseService {

    private httpClinet : HttpClient;

    constructor(httpClient: HttpClient) {
        super();
        this.httpClinet = httpClient;
    }

    public registUser(registerModel: RegisterModel) : Observable<UserModel> {    
        
        if (this.isLoggedIn()) 
            return throwError(() => new Error('User is already logged in. Please logout before registering a new user.'));

        const registerRequestDTO = RegisterMapperService.MapToDTO(registerModel);
        const observableUserModels: Observable<UserModel> = 
                this.httpClinet
                .post<RegisterResponseDTO>(this.UrlServiceV1 + 'auth/create-account', registerRequestDTO, this.getHeaderJson())
                .pipe(
                    map(RegisterMapperService.MapToModel),
                    tap((userModel: UserModel) => { this.localStorage.saveLocalUserData(userModel); }),
                    catchError(this.HandleError)
                );
        return observableUserModels;
    }

    public login(loginModel: LoginModel) : Observable<UserModel> {

        if (this.isLoggedIn())
        {
            const userModel : UserModel = this.localStorage.getUser()!;
            const observable : BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(userModel);
            return observable
        }

        const loginRequestDTO = LoginMapperService.MapToDTO(loginModel);
        const observableUserModel : Observable<UserModel> = 
                this.httpClinet
                .post<LoginResponseDTO>(this.UrlServiceV1 + 'auth/login', loginRequestDTO, this.getHeaderJson())
                .pipe(
                    map(LoginMapperService.MapToModel),
                    tap((userModel: UserModel) => { this.localStorage.saveLocalUserData(userModel);}),
                    catchError(this.HandleError)
                );
        return observableUserModel;
    }

    public logout() : void {
        this.localStorage.cleanLocalUserData();
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