import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { APP_ROUTING } from "./app.routings";

import { HttpComponent } from "./core/http.component";
import { SalaryComponent } from "./salary/salary.component";

import { Employees } from './model/employee';
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";
import { MainmenuModule } from "./mainmenu/mainmenu.module";
import { Schedule } from "./model/schedule";
import { SetupComponent } from "./setup/setup.component";
import { SetupModule } from "./setup/setup.module";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTING,
        FormsModule,
        ReactiveFormsModule,
        MainmenuModule,
        SetupModule
    ],
    declarations: [
        AppComponent,
        // EmployeesComponent,
        SalaryComponent,
        SetupComponent
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
