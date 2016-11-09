import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { SalaryComponent } from "./salary/salary.component";
import { SetupComponent } from "./setup/setup.component";
import { setupRoutes } from "./setup/setup.module";
import { salaryRoutes } from "./salary/salary.module";
import { AuthGuard } from "./core/authguard";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: MainMenuComponent, canActivate: [AuthGuard] },
    // { path: 'emp', component: EmployeesComponent },
    { path: 'pay', component: SalaryComponent, children: salaryRoutes, canActivate: [AuthGuard]},
    { path: 'setup', component: SetupComponent, children: setupRoutes, canActivate: [AuthGuard] },
    // { path: 'setup', component: SetupComponent },

];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});