import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export abstract class BaseService {

    protected UrlServiceV1: string = "https://localhost:7292/api/";

    protected getHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type':'application/json'
            })
        };
    }

    protected extractData(response: any) : any {
        return response.data || {};
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