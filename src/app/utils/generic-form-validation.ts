import { FormControl, FormGroup } from "@angular/forms";

export class GenericValidator {
    
    private readonly validationMessages: ValidationMessages;

    constructor(validationMessages: ValidationMessages) {
        this.validationMessages = validationMessages;
    }

    processMessages(formGroup: FormGroup): DisplayMessage {
        let messages: DisplayMessage = {};
        for (let controlKey in formGroup.controls){
            if (formGroup.controls.hasOwnProperty(controlKey)){
                let control = formGroup.controls[controlKey];

                if (control instanceof FormGroup){
                    let childMessages = this.processMessages(control);
                    Object.assign(messages, childMessages);
                } else {
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = {};
                        if ((control.dirty || control.touched) && control.errors){
                            Object.keys(control.errors).map(messageKey => {
                                if (this.validationMessages[controlKey][messageKey]){
                                    messages[controlKey][messageKey] = this.validationMessages[controlKey][messageKey];
                                }
                            });
                        }
                    }
                }
            }
        }
        return messages;
    }
}

export class ValidationMessages{
    [key: string]: {[key: string] : string}
}

export class DisplayMessage {
    [key: string] : {[key: string] : string}
}