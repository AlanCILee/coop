import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { APP_ROUTING } from "./app.routings";

import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { EmployeesComponent } from "./employees/employees.component";
import { HttpComponent } from "./module/http.component";
import { SalaryComponent } from "./salary/salary.component";

import { Employees } from './model/employee';
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";
import { MainmenuModule } from "./mainmenu/mainmenu.module";
import { Schedule } from "./model/schedule";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTING,
        FormsModule,
        ReactiveFormsModule,
        MainmenuModule
    ],
    declarations: [
        AppComponent,
        EmployeesComponent,
        SalaryComponent
    ],
    providers: [
        HttpComponent,
        Employees,
        Departments,
        TimeTable,
        Schedule,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
