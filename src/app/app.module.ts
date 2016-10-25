import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { APP_ROUTING } from "./app.routings";

import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { EmployeesComponent } from "./employees/employees.component";


@NgModule({
    imports: [
        BrowserModule,
        APP_ROUTING
    ],
    declarations: [
        AppComponent,
        MainMenuComponent,
        EmployeesComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
