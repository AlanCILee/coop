// import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainMenuComponent } from "./mainmenu.component";
import { DispScheduleComponent } from "./displaySchedule/dispschedule.component";
import { ShareModule } from "../core/Share.module";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        NgbModule,
    ],
    declarations: [
        MainMenuComponent,
        DispScheduleComponent,
    ],
    providers: [
    ],
    exports: [
    ],
})

export class MainmenuModule { }