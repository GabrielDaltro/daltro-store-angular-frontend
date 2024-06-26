import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "../components/utils/localstorage";
import { environment } from "../../environments/environment";

export abstract class BaseService {

    public localStorage = new LocalStorageUtils();

    protected UrlServiceV1: string = environment.apiUrlV1;

    protected getHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type':'application/json'
            })
        };
    }

    protected HandleError(response: Response | any) : Observable<never> {
        const customError : string[] = [];

        if (response instanceof HttpErrorResponse) {
            if(response.statusText === "Unknown Error"){
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        console.error(response);
        return throwError(() => response);
    }
}