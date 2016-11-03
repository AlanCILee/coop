import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DatePickerComponent } from '../core/datepicker/ng2-datepicker';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		DatePickerComponent,
	],
	providers: [

	],
	exports: [
		DatePickerComponent,
	],
})

export class ShareModule { }