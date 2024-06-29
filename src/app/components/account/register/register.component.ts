import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '@narik/custom-validators';
import { UserModel } from '../../../models/user.model';
import { AccountService } from '../../../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from '../guards/cancomponentdeactivate';
import { RegisterModel } from '../../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  providers: [AccountService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, AfterViewInit, CanComponentDeactivate { 
  
  @ViewChildren(FormControlName, {read: ElementRef})
  formInputElements!: ElementRef[];

  public errors: any[] = [];
  private user : RegisterModel | undefined;
  private readonly formBuilder : FormBuilder;
  private readonly accountService : AccountService;
  
  unsavedChanges: boolean;
  registrationForm! : FormGroup;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(formBuilder : FormBuilder, 
              accountService : AccountService,
            private router: Router,
            private toastr: ToastrService) {
    this.formBuilder = formBuilder;
    this.accountService = accountService;

    this.validationMessages = {
      name: {
        required: 'Informe o nome'
      },
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
    this.unsavedChanges = false;
  }

  public ngOnInit(): void {
    let password = new FormControl('', [Validators.required ,CustomValidators.rangeLength([6, 15])]);
    let confirmPassword = new FormControl('',[Validators.required , CustomValidators.equalTo(password)]);

    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  public ngAfterViewInit(): void {
    let controlsBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  
    merge(...controlsBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.registrationForm);
      this.unsavedChanges = true;
    });
  }

  public addUserAccount() : void {
    if (this.registrationForm!.dirty && this.registrationForm!.valid)
    {
      this.user = Object.assign({}, this.user, this.registrationForm?.value); 
      this.accountService
        .registUser(this.user!)
        .subscribe({
          next: response => this.processSuccess(response),
          error: error => this.processError(error)
        });
    }
  }

  public processSuccess(model: UserModel) {
    this.registrationForm.reset();
    this.errors = [];
    this.unsavedChanges = false;

    const activeToast: ActiveToast<any> = this.toastr.success('Cadastro realizado com sucesso!', 'Bem vindo!', {
      progressBar: true
    });
    activeToast.onHidden.subscribe(() => this.router.navigate(['/home']));
  }

  public processError(fail: any) {
    this.errors = fail.error.errors.Message;
  }

  public canDeactivate() {
    if (this.unsavedChanges)
      return window.confirm("Tem certeza que deseja sair?");
    return true; 
  }

  public getErrorListByFormControlName(formControlName : string) : string[]
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