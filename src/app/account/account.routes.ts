import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { canActivateLoginGuard, canActivateRegisterGuard, canDeactiveRegisterGuard } from "./services/account.guard";

export const AccountRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path:  'login',
                component: LoginComponent,
                canActivate: [canActivateLoginGuard()]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [canActivateRegisterGuard()],
                canDeactivate: [canDeactiveRegisterGuard()]
            }
        ]
    }
];
