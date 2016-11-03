import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DatePickerComponent } from '../core/datepicker/ng2-datepicker';
import { MapToIterable } from "./maptoIterable.pipe";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		DatePickerComponent,
		MapToIterable,
	],
	providers: [

	],
	exports: [
		DatePickerComponent,
		MapToIterable,
	],
})

export class ShareModule { }