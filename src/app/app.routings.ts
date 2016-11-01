import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './mainmenu/mainmenu.component';
// import { EmployeesComponent } from "./employees/employees.component";
import { SalaryComponent } from "./salary/salary.component";
import { SetupComponent } from "./setup/setup.component";
import { setupRoutes } from "./setup/setup.module";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: MainMenuComponent },
    // { path: 'emp', component: EmployeesComponent },
    { path: 'pay', component: SalaryComponent}, // , children: SalaryChild },
    { path: 'setup', component: SetupComponent, children: setupRoutes },
    // { path: 'setup', component: SetupComponent },
    // { path: 'contactus', redirectTo: 'contact' },

];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});