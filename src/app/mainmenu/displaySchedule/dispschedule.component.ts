import { Component, Input, OnInit }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";

declare var Snap: any;// = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html'
})


export class DispScheduleComponent implements OnInit {
	@Input() departJobs: Job[];
	@Input() department: string;

	constructor(private departments: Departments) {
	
	}

	ngOnInit() {
		Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

	}
	
	ngAfterViewInit(): void {
		this.createInitiativeBg();
	
	}
	
	getEmpNum(jobs: Job[]): number {
		let cnt: number = 0;
		let empId: number[] = [];
		
		jobs.forEach(( job )=>{
			if( empId.some(( id )=> {
				return id == job.empId;
				})
			){
				
			}else{
				empId.push(job.empId);
				cnt++;
			}
		});
		console.log('number of emp for depart:', cnt);
		return cnt;
	}
	
	createInitiativeBg(): void {
		
		let width = 1000,
			height = this.getEmpNum(this.departJobs) * 30,
			container = document.getElementById(this.department),
			svgCanvas = Snap(width, height).attr({'id': 'bg'+this.department});

		    svgCanvas.rect(0, 0, width, height).attr({fill: '#ababab'});
		    container.appendChild(document.getElementById('bg'+this.department));
	
	}

}