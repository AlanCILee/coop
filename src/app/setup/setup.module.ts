import { NgModule } from '@angular/core';
import { HttpComponent } from "../core/http.component";
import { CommonModule } from "@angular/common";

import { EmployeesComponent } from "./employees/employees.component";
import { TimezoneComponent } from "./timezone/timezone.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {SetupComponent} from "./setup.component";

// import { Employees } from "../model/employee";
// import { Departments } from "../model/department";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		// RouterModule.forRoot(setupRoutes, {useHash: true}),
	],
	declarations: [
		EmployeesComponent,
		TimezoneComponent,
	],
	providers: [
		// Employees,
		// Departments,
	],
	exports: [

	],
})
export class SetupModule { }

export const setupRoutes: Routes = [
	{ path: '', },
	{ path: 'employee', component: EmployeesComponent },
	{ path: 'timezone', component: TimezoneComponent },
];

