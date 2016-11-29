import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReviewComponent } from "./review/review.component";
import { InputComponent } from "./input/input.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../core/Share.module";
import { AuthGuard } from "../core/authguard";
import { SalaryComponent } from "./salary.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        RouterModule,
    ],
    providers: [
    ],
    declarations: [
        SalaryComponent,
        InputComponent,
        ReviewComponent,
    ],
    exports: [
        SalaryComponent,
    ],
})

export class SalaryModule { }

export const salaryRoutes: Routes = [
    { path: '', },
    { path: 'input', component: InputComponent, canActivate: [AuthGuard] },
    { path: 'review', component: ReviewComponent, canActivate: [AuthGuard] },
];