import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpComponent } from "../core/http.component";
import { ReviewComponent } from "./review/review.component";
import { InputComponent } from "./input/input.component";
import { Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { DatePickerComponent } from "../core/datepicker/ng2-datepicker";
import { ShareModule } from "../core/Share.module";
import { AuthGuard } from "../core/authguard";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
    ],
    providers: [
        HttpComponent,
        AuthGuard,
    ],
    declarations: [
        InputComponent,
        ReviewComponent,
        // MapToIterable,
    ],
})

export class SalaryModule { }

export const salaryRoutes: Routes = [
    { path: '', },
    { path: 'input', component: InputComponent, canActivate: [AuthGuard] },
    { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
];