import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'account-app-root',
    standalone: true,
    template: `<router-outlet></router-outlet>`,
    imports: [RouterOutlet]
})
export class AccountComponent {

}