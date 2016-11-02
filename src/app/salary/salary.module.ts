import { NgModule } from '@angular/core';
import { HttpComponent } from "../core/http.component";
import { ReviewComponent } from "./review/review.component";
import { InputComponent } from "./input/input.component";
import { Routes } from "@angular/router";

@NgModule({
    declarations: [
        InputComponent,
        ReviewComponent,
    ],
    providers: [ HttpComponent ],
})

export class SalaryModule { }

export const salaryRoutes: Routes = [
    { path: '', },
    { path: 'input', component: InputComponent },
    { path: 'review', component: ReviewComponent },
];