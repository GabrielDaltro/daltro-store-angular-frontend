import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AccountService } from "../../../../services/account.service";


@Component({
    selector: 'app-login-menu',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    providers: [AccountService],
    templateUrl: './login-menu.component.html',
    styleUrls: ['../menu.component.css'],
})
export class LoginMenuComponent {
    
    constructor(private router: Router, public accoutService: AccountService) { }

    public logout() : void {
        this.accoutService.logout();
        this.router.navigate(["/home"]);
    }

    public getUserName() : string | null {
        const userName = this.accoutService.getUserName();
        return userName!= null? userName.split(" ")[0] : null;
    }
}