import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { APP_ROUTING } from "./app.routings";
import { HttpComponent } from "./core/http.component";

import { Employees } from './model/employee';
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";
import { MainmenuModule } from "./mainmenu/mainmenu.module";
import { Schedule } from "./model/schedule";
import { SetupModule } from "./setup/setup.module";
import { SalaryModule } from "./salary/salary.module";
import { TipModel } from "./model/tip";
import { ShareModule } from "./core/Share.module";
import { AuthGuard } from "./core/authguard";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogIn } from "./model/login";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTING,
        FormsModule,
        ReactiveFormsModule,
        MainmenuModule,
        SetupModule,
        SalaryModule,
        NgbModule.forRoot(),
        ShareModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
    ],
    providers: [
        HttpComponent,
        Employees,
        Departments,
        TimeTable,
        Schedule,
        TipModel,
        AuthGuard,
        LoginComponent,
        LogIn,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
