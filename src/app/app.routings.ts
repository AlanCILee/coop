import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { EmployeesComponent } from "./employees/employees.component";
import { SalaryComponent } from "./salary/salary.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: MainMenuComponent },
    { path: 'emp', component: EmployeesComponent },
    { path: 'pay', component: SalaryComponent },
    // { path: 'contact', component: ContactComponent },
    // { path: 'contactus', redirectTo: 'contact' },
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});