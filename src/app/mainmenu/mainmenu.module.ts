import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpComponent } from "../module/http.component";
import { DatePickerComponent } from './components/ng2-datepicker';
import { MainMenuComponent } from "./mainmenu.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MainMenuComponent,
        DatePickerComponent
    ],
    providers: [
        HttpComponent,
    ],
    exports: [
        MainMenuComponent
    ],
})

export class MainmenuModule { }