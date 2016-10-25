import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_ROUTING } from "./app.routings";

import { MainMenuComponent } from './mainmenu/mainmenu.component';
import { EmployeesComponent } from "./employees/employees.component";
import { HttpComponent } from "./module/http.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTING,
    ],
    declarations: [
        AppComponent,
        MainMenuComponent,
        EmployeesComponent
    ],
    providers: [ HttpComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
