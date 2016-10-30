import { Component, Input, OnInit }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";

declare var Snap: any;// = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html'
})


export class DispScheduleComponent implements OnInit {
	// @Input() departJobs: Job[];
	// @Input() department: string;
	// departJobs: Job[][];
	department: string;
	@Input() sJobs: Job[];
	
	departJobs: any[][] =[];

	departCnt: number;
	dispEmpNum: number;
	
	constructor(private departmentsObj: Departments) {
	
	}

	ngOnInit() {
		Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

	}
	
	ngAfterViewInit(): void {
		this.createInitiativeBg();
	
	}
	
	// getDepNum(sJobs: Job[]): number {
	// 	let cnt: number = 0;
	// 	let depId: number[] = [];
	//
	// 	sJobs.forEach(( sJob )=>{
	// 		if( sJob.length > 1)
	// 			cnt++;
	// 	});
	// 	console.log('number of depart have Schedule :', cnt);
	// 	return cnt;
	// }
	
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
		console.log('number of emp for each depart:', cnt);
		return cnt;
	}
	

	
	alignJobs(sJobs: Job[]){
		let departJob: Job[] =[];
		
		this.departCnt = 0;
		this.dispEmpNum = 0;
		
		this.departmentsObj.departments.forEach((department)=>{

			departJob = sJobs.filter((job)=>{
				return job.departName == department.departName;
			});
			
			if(departJob.length > 1) {
				this.departJobs[department.departName] = [];
				this.departJobs[department.departName] =  departJob;
				this.departCnt++;
				this.dispEmpNum += this.getEmpNum(departJob);
			}
		});
	
		console.log('alignJobs:', this.departJobs, 'dispDepart: ', this.departCnt,'dispEmpNumb:', this.dispEmpNum);
	}
	
	createInitiativeBg(): void {
		this.alignJobs(this.sJobs);
		
		let width = 100 * 15,
		 	height = this.dispEmpNum * 30 + this.departCnt * 30,
		 	container = Snap('#svgContainer');
		
		    container.rect(0, 0, width, height).attr({fill: '#ababab'});
	}

}