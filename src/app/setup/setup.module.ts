import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { EmployeesComponent } from "./employees/employees.component";
import { TimezoneComponent } from "./timezone/timezone.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import { MapToIterable } from "../core/maptoIterable.pipe";
import { DepartmentComponent } from "./department/department.component";
import { ShareModule } from "../core/Share.module";
import { AuthGuard } from "../core/authguard";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ShareModule,
	],
	declarations: [
		EmployeesComponent,
		TimezoneComponent,
		DepartmentComponent,
		// MapToIterable
	],
	providers: [

	],
	exports: [

	],
})
export class SetupModule { }

export const setupRoutes: Routes = [
	{ path: '', },
	{ path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
	{ path: 'employee', component: EmployeesComponent, canActivate: [AuthGuard] },
	{ path: 'timezone', component: TimezoneComponent, canActivate: [AuthGuard] },
];

