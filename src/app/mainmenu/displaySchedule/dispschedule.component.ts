import { Component, Input, OnInit }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";

declare var Snap: any;// = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html'
})


export class DispScheduleComponent implements OnInit {

	@Input() sJobs: Job[];
	
	// department: string;
	departJobs: any[][] =[];
	departCnt: number;
	dispEmpNum: number;
	container: any;
	
	constructor(private departmentsObj: Departments) {
	
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
		const HOURS = 17;
		const START_HOUR = 8;
		const OFFSET = 200;
		
		this.alignJobs(this.sJobs);
		
		let width = 100 * HOURS + OFFSET,
		 	height = this.dispEmpNum * 30 + this.departCnt * 30,
		 	container = Snap('#svgContainer');
		
		container.rect(0, 0, width, height).attr({fill: '#ababab'});
		
		for (var i= 0; i < HOURS; i++){
			container.text(OFFSET+ 100*i, 20, i+START_HOUR+":00").attr({
				font: "100 1em Source Sans Pro",
				textAnchor: "middle",
				fill: "#FFF"
			});
			
			container.line(OFFSET+ 100*i, 0, OFFSET+ 100*i, height).attr({
				stroke: '#fff'
			});
			
		}
		
		this.container = container;
	}
	
	

}