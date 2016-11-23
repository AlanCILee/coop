import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { SalaryComponent } from "./salary/salary.component";
import { SetupComponent } from "./setup/setup.component";
import { setupRoutes } from "./setup/setup.module";
import { salaryRoutes } from "./salary/salary.module";
import { AuthGuard } from "./core/authguard";
import { LoginComponent } from "./login/login.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'schedule', component: MainMenuComponent, canActivate: [AuthGuard]  },
    { path: 'pay', component: SalaryComponent, children: salaryRoutes, canActivate: [AuthGuard]  },
    { path: 'setup', component: SetupComponent, children: setupRoutes, canActivate: [AuthGuard]  },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});