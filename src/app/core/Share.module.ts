import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DatePickerComponent } from '../core/datepicker/ng2-datepicker';
import { MapToIterable } from "./maptoIterable.pipe";
import { ErrorMessage } from "./errorMessage";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		ErrorMessage,
		DatePickerComponent,
		MapToIterable,
	],
	providers: [
	],
	exports: [
		DatePickerComponent,
		MapToIterable,
		ErrorMessage,
	],
})

export class ShareModule { }