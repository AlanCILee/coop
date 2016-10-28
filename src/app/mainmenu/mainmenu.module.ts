// import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpComponent } from "../core/http.component";
import { DatePickerComponent } from './datepicker/ng2-datepicker';
import { MainMenuComponent } from "./mainmenu.component";
import { DispScheduleComponent } from "./displaySchedule/dispschedule.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MainMenuComponent,
        DatePickerComponent,
        DispScheduleComponent,
    ],
    providers: [
        HttpComponent,
    ],
    exports: [
        MainMenuComponent
    ],
})

export class MainmenuModule { }