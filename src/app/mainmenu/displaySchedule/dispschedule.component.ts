import { Component } from '@angular/core';
import { Input } from "@angular/core";
import { Job } from "../../model/schedule";


@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html',
	// styleUrls: ['./mainmenu.component.css']
})

export class DispScheduleComponent {
	@Input() jobs: Job[];



	
}