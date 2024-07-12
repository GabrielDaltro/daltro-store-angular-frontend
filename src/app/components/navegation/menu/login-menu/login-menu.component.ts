import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AccountService } from "../../../../services/account.service";


@Component({
    selector: 'app-login-menu',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './login-menu.component.html',
    styleUrls: ['../menu.component.css'],
})
export class LoginMenuComponent implements OnInit {
    
    public isLoggedIn : boolean = false; 

    constructor(private router: Router, public accoutService: AccountService) { 
        console.log("LoginMenuComponent criado");
    }

    ngOnInit(): void {
        this.accoutService.isLoggedIn$.subscribe({
            next: (loginResult: boolean) => {
                this.isLoggedIn = loginResult;
                console.info(this.isLoggedIn);
            },
            error: error => {
                this.isLoggedIn = false;
                console.error("Error to check if has a user logged");
            }
        });
    }

    public logout() : void {
        this.accoutService.logout();
        this.router.navigate(["/home"]);
    }

    public getUserName() : string | null {
        const userName = this.accoutService.getUserName();
        return userName!= null? userName.split(" ")[0] : null;
    }
}