import { GuardResult, MaybeAsync } from "@angular/router";

export interface CanComponentDeactivate {
    canDeactivate: () => MaybeAsync<GuardResult>;
}