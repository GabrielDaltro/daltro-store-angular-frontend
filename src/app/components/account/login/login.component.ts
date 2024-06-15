import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { CustomValidators } from '@narik/custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  providers: [AccountService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef})
  private formInputElements!: ElementRef[];


  private readonly formBuilder : FormBuilder;
  private readonly accountService : AccountService;
  private readonly validationMessages: ValidationMessages;
  private readonly genericValidator: GenericValidator;
  
  public loginForm! : FormGroup;
  public displayMessage: DisplayMessage = {};
  public errors: any[] = [];


  constructor(formBuilder : FormBuilder, 
              accountService : AccountService) {
    
    this.formBuilder = formBuilder;
    this.accountService = accountService;
    
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    let controlsBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  
    merge(...controlsBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    });
  }

  loginUser() {
    if(this.loginForm.dirty && this.loginForm.valid)
    {
      
    }
  }

  processSuccess(response: any) {

  }

  proccessError(fail: any) {

  }

  
  getErrorListByFormControlName(formControlName : string) : string[]
  {
    const errors : string[] = [];
    const messagesOfControl = this.displayMessage[formControlName];
    for(let error in messagesOfControl)
    {
      errors.push(messagesOfControl[error]);
    }
    return errors;
  }

}
