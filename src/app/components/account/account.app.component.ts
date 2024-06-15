import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AccountService } from "../../services/account.service";

@Component({
    selector: 'account-app-root',
    standalone: true,
    template: `<router-outlet></router-outlet>`,
    imports: [RouterOutlet]
})
export class AccountComponent {

}