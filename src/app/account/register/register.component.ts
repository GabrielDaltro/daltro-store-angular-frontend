import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@narik/custom-validators';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  providers: [AccountService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit { 
  
  @ViewChildren(FormControlName, {read: ElementRef})
  formInputElements!: ElementRef[];

  private errors: any[] = [];
  private user : User | undefined;
  private registrationForm! : FormGroup;
  private readonly formBuilder : FormBuilder;
  private readonly accountService : AccountService;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

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
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let password = new FormControl('', [Validators.required ,CustomValidators.rangeLength([6, 15])]);
    let confirmPassword = new FormControl('',[Validators.required ,CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(password)]);

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  ngAfterViewInit(): void {
    let controlsBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  
    merge(...controlsBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.registrationForm);
    });
  }

  addUserAccount() : void {
    if (this.registrationForm!.dirty && this.registrationForm!.valid)
    {
      this.user = Object.assign({}, this.user, this.registrationForm?.value); 
        this.accountService.registUser(this.user!);
    }
  }
}