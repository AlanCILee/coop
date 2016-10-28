import { Component, Input, OnInit }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html',
	// styleUrls: ['./mainmenu.component.css']
})

export class DispScheduleComponent implements OnInit {
	@Input() departJobs: Job[];
	@Input() department: string;


	constructor(private departments: Departments) {
	}

	ngOnInit() {

		// departJobs: any[] =[];
		// console.log('ngOnInit() jobs:', this.jobs);
		// this.departments.departments.forEach((department)=>{
		// 	// this.departJobs[department] = [];
		// 	this.departJobs[department.departName] = this.jobs.filter((job)=>{
		// 	// this.departJobs = this.jobs.filter((job)=>{
		// 		console.log('job.departName:', job.departName);
		// 		console.log('department.departName:', department.departName);
		// 		return job.departName == department.departName;
		// 	});
		//
		// });
		// console.log('ngOnInit() dispschedule:', this.departJobs);
	}

}