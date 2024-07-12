export class ErrorResponseDTO {
    
    private readonly _title: string;
    private _details: string = "";
    private _validationErrors : {[key: string] : string[]} = {};
  
    constructor(title: string) {
        this._title = title;
    }

    public get title() {
        return this._title;
    }

    public get detail() {
        return this._details;
    }

    public set detail(value: string) {
        this._details = value;
    }

    public get validationErrors() {
        return this._validationErrors;
    }

    public set validationErrors(errors: { [key: string]: string[] }) {
        this._validationErrors = errors;
    }

    public getErrorsSumary() : string[]
    {
        const errors: string[] = [];

        if (Object.keys(this._validationErrors).length === 0)
            errors.push(this._title);
        else
            for(let modelField in this._validationErrors)
                errors.push(...this._validationErrors[modelField])
        
        return errors;
    }
}