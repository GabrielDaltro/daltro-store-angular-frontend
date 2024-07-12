import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../utils/generic-form-validation';
import { CustomValidators } from '@narik/custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { LoginModel } from '../../../models/login.model';
import { UserModel } from '../../../models/user.model';
import { ErrorResponseDTO } from '../../../dto/responses/error-response.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
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
  private readonly toastr: ToastrService;
  private readonly router: Router;
  
  public loginForm! : FormGroup;
  public displayMessage: DisplayMessage = {};
  public errors: string[] = [];


  constructor(formBuilder : FormBuilder, 
              accountService : AccountService,
              toastr: ToastrService,
              router: Router) {
    
    this.formBuilder = formBuilder;
    this.accountService = accountService;
    this.toastr = toastr;
    this.router = router;
    
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

  public ngAfterViewInit(): void {
    let controlsBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  
    merge(...controlsBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    });
  }

  public loginUser() {
    if(this.loginForm.dirty && this.loginForm.valid)
    {
      const loginModel: LoginModel = new LoginModel(this.loginForm.get('email')?.value ?? '', this.loginForm.get('password')?.value ?? '');
      this.accountService
        .login(loginModel)
        .subscribe({
          next: userModel => {this.processSuccess(userModel)},
          error: error => {this.proccessError(error)}
        });
    }
  }

  public processSuccess(model: UserModel) {
    this.loginForm.reset();
    this.errors = [];

    const activeToast: ActiveToast<any> = this.toastr.success('Cadastro realizado com sucesso!', 'Bem vindo!', {
      progressBar: true
    });
    activeToast.onHidden.subscribe(() => this.router.navigate(['/home']));
  }

  public proccessError(errors: ErrorResponseDTO) {
    this.errors.length = 0;
    this.errors = errors.getErrorsSumary();
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
