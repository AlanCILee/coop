import { Component, Input, OnInit, EventEmitter }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";

declare var Snap: any;// = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html',
	outputs: ['sendJob']
})


export class DispScheduleComponent implements OnInit {

	@Input() sJobs: Job[];
	
	// department: string;
	departJobs: any[][] =[];
	departments: string[]=[];
	departCnt: number;
	dispEmpNum: number;
	container: any;
	
	hOffset: number = 0;
	private sendJob: EventEmitter<Job>;
	
	constructor(private departmentsObj: Departments) {
		this.sendJob = new EventEmitter<Job>();
	}

	ngOnInit() {
		Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

	}
	
	ngAfterViewInit(): void {
		console.log("Schedule Disp : ngAfterViewInit");

	}
	
	ngOnChanges(): void {
		console.log("Schedule Disp : ngOnChange");
		
		this.departJobs = [];
		this.departments = [];
		this.departCnt = 0;
		this.dispEmpNum = 0;
		this.hOffset = 0;
		if(this.container){
			console.log("clear Container");
			this.container.clear();
			this.container = null;
		}
		this.createInitiativeBg();
		this.showSchdule();
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
		console.log('alignJobs sJobs:', sJobs);
		let departJob: Job[] =[];
		
		this.departCnt = 0;
		this.dispEmpNum = 0;
		
		this.departmentsObj.departments.forEach((department)=>{

			departJob = sJobs.filter((job)=>{
				return job.departName == department.departName;
			});
			
			if(departJob.length > 0) {
				this.departJobs[department.departName] = [];
				this.departJobs[department.departName] =  departJob;
				this.departments.push(department.departName);
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
		const HOURW = 100;
		
		this.hOffset = 0;
		
		this.alignJobs(this.sJobs);
		
		let width = HOURW * HOURS + OFFSET,
		 	height = this.dispEmpNum * 30 + this.departCnt * 30 + 50,
		 	container = Snap('#svgContainer');
		
		console.log('width: ',width,'height: ',height);
		container.rect(0, 0, width, height).attr({fill: '#ababab'});
		
		this.hOffset += 20;
		
		for (var i= 0; i < HOURS; i++){
			container.text(OFFSET+ HOURW*i, this.hOffset, i+START_HOUR+":00").attr({
				font: "100 1em Source Sans Pro",
				textAnchor: "middle",
				fill: "#FFF"
			});
			
			container.line(OFFSET+ HOURW*i, 0, OFFSET+ HOURW*i, height).attr({
				stroke: '#fff'
			});
			
		}
		
		this.container = container;
	}
	
	showSchdule(): void{
		let svg = this.container;
		const OFFSET = 200;
		const HOURW = 100;
		const START_HOUR = 8;
		
		this.departments.forEach((department)=>{
			this.hOffset += 20;
			let empOffset: any[]=[];
			
			svg.text(0, this.hOffset, department).attr({
				font: "100 1em Source Sans Pro",
				textAnchor: "left",
				fill: "#FFF"
			});
			
			this.departJobs[department].forEach((departJob) =>{

				// empName[departJob.empName] = [];
				if(!empOffset[departJob.empName]) {
					this.hOffset += 20;

					empOffset[departJob.empName] = this.hOffset;

					svg.text(0, empOffset[departJob.empName], departJob.empName).attr({
						font: "100 1em Source Sans Pro",
						textAnchor: "left",
						fill: "#FFF"
					});
				}
				
				let x = OFFSET + HOURW * (departJob.startN - START_HOUR*60) /60;
				let w = HOURW * (departJob.endN - departJob.startN) /60;
				console.log("x: ",x, "w: ",w );
				svg.rect(x, empOffset[departJob.empName]-20, w, 20).attr({
					fill: "#FFF",
					stroke: "#000",
					strokeWidth: 1
				}).click(()=>{
					this.jobClick(departJob);
				});
			})
		});
	}
	
	jobClick(departJob : Job): void{
		this.sendJob.emit(departJob);
	}

}