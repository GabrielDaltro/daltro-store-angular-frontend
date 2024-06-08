import { CanActivateFn, CanDeactivateFn } from "@angular/router";
import { CanComponentDeactivate } from "./cancomponentdeactivate";
import { inject } from "@angular/core";
import { AccountService } from "./account.service";

export function canActivateRegisterGuard() : CanActivateFn {
    return () => {
        const accountService = inject(AccountService);
        return !accountService.isLoggedIn();
    };
}

export function canActivateLoginGuard() : CanActivateFn {
    return canActivateRegisterGuard();
}

export function canDeactiveRegisterGuard() : CanDeactivateFn<CanComponentDeactivate> {
    return (component: CanComponentDeactivate) => component.canDeactivate();
}