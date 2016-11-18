// import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpComponent } from "../core/http.component";
import { DatePickerComponent } from '../core/datepicker/ng2-datepicker';
import { MainMenuComponent } from "./mainmenu.component";
import { DispScheduleComponent } from "./displaySchedule/dispschedule.component";
import { ShareModule } from "../core/Share.module";
// import { ErrorMessage } from "../core/errorMessage";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule
    ],
    declarations: [
        MainMenuComponent,
        // DatePickerComponent,
        DispScheduleComponent,
        // ErrorMessage,
    ],
    providers: [
        HttpComponent,
    ],
    exports: [
        MainMenuComponent
    ],
})

export class MainmenuModule { }