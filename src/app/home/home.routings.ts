import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from '../mainmenu/mainmenu.component';
import { SalaryComponent } from "../salary/salary.component";
import { SetupComponent } from "../setup/setup.component";
import { setupRoutes } from "../setup/setup.module";
import { salaryRoutes } from "../salary/salary.module";
import { AuthGuard } from "../core/authguard";
import { LoginComponent } from "../login/login.component";
import { AppComponent } from "../app.component";
import {HomeComponent} from "./home.component";

export const HomeRoutes: Routes = [
    { path: '', redirectTo: 'schedule', pathMatch: 'full'},
    // { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'schedule', component: MainMenuComponent, canActivate: [AuthGuard] },
    { path: 'pay', component: SalaryComponent, children: salaryRoutes, canActivate: [AuthGuard]},
    { path: 'setup', component: SetupComponent, children: setupRoutes, canActivate: [AuthGuard] },
    // { path: 'setup', component: SetupComponent },
];

export const HOME_ROUTING: ModuleWithProviders = RouterModule.forRoot(HomeRoutes, {useHash: true});