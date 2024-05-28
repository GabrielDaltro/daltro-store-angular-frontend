import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { LoginMenuComponent } from "../../account/login-menu/login-menu.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    imports: [RouterLink, RouterLinkActive, LoginMenuComponent]
})
export class MenuComponent{
    constructor() {
        console.log("created");
    }
}