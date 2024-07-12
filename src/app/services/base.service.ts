import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LocalStorageUtils } from "../components/utils/localstorage";
import { environment } from "../../environments/environment";
import { ErrorResponseDTO } from "../dto/responses/error-response.dto";

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

    protected HandleError(errorResponse: HttpErrorResponse) : Observable<never> {
        
        let errors : ErrorResponseDTO;
        if (errorResponse.status === 0)
        {
            errors = new ErrorResponseDTO("Ocorreu um erro desconhecido");
            console.error("ErroInterno:");
            console.error(errorResponse);
        }
        else
        {           
            console.error(errorResponse);
            errors = new ErrorResponseDTO(errorResponse.error.title);
            if(errorResponse.error.errors != null)
                errors.validationErrors = errorResponse.error.errors
            if(errorResponse.error.detail != null)
                errors.detail = errorResponse.error.detail;
        }
        return throwError(() => errors);
    }
}