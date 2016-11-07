import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpComponent } from "../core/http.component";
import { ReviewComponent } from "./review/review.component";
import { InputComponent } from "./input/input.component";
import { Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { DatePickerComponent } from "../core/datepicker/ng2-datepicker";
import { ShareModule } from "../core/Share.module";



@NgModule({
    declarations: [
        InputComponent,
        ReviewComponent,
        // MapToIterable,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
    ],
    providers: [ HttpComponent ],
})

export class SalaryModule { }

export const salaryRoutes: Routes = [
    { path: '', },
    { path: 'input', component: InputComponent },
    { path: 'review', component: ReviewComponent },
];