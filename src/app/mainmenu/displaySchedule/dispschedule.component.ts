import { Component, Input, OnInit, EventEmitter }  from '@angular/core';
import { Job } from "../../model/schedule";
import { Department, Departments } from "../../model/department";
import { Employees } from "../../model/employee";

// declare var Snap: any;// = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

@Component({
	selector: 'schedule',
	templateUrl: './dispschedule.component.html',
	outputs: [
		'sendJob',
		'sendDate',
	]
})

export class DispScheduleComponent implements OnInit {
	@Input() sJobs: Job[];
	@Input() editItem: Job;
	@Input() editDate: string;

	Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );
	departments: string[]=[];
	departCnt: number;
	dispEmpNum: number;
	dispDateNum: number;
	container: any;
	hOffset: number = 0;
	private sendJob: EventEmitter<Job>;
	private sendDate: EventEmitter<string>;
	jobsDatesDeparts: any[] = [];
	
	constructor(private departmentsObj: Departments,
				private employeesObj: Employees) {
		this.sendJob = new EventEmitter<Job>();
		this.sendDate = new EventEmitter<string>();
	}

	ngOnInit() {
	}
	
	ngAfterViewInit(): void {
		console.log("Schedule Disp : ngAfterViewInit");

	}
	
	ngOnChanges(): void {
		console.log("Schedule Disp : ngOnChange");
		
		// this.departJobs = [];
		// this.departments = [];
		this.departCnt = 0;
		this.dispEmpNum = 0;
		this.dispDateNum = 0;
		this.hOffset = 0;
		this.jobsDatesDeparts = [];
		
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
		this.dispDateNum = 0;

		let jobsDates: any[] = [];
		

		sJobs.forEach(( job ) => {
			if(job.valid)
			if(!(job.date in jobsDates)){
				jobsDates[job.date] = [];
				this.jobsDatesDeparts[job.date] = [];
				console.log('create date');
			}

			jobsDates[job.date].push( job );
			console.log('Add job date:', job.date, 'Add job: ',job);
		});

		console.log('align job by date: ', jobsDates);

		Object.keys(jobsDates).forEach((key)=>{     // key : date
			let jobs: Job[] = jobsDates[key];
			this.dispDateNum++;
			console.log('jobsDates[key] :', jobs);
			// this.departJobs = [];

			this.departmentsObj.departments.forEach((department)=> {

				departJob = jobs.filter((job)=>{
					return job.departId == department.departId;
				});

				if(departJob.length > 0) {
					this.jobsDatesDeparts[key][department.departId] = [];
					this.jobsDatesDeparts[key][department.departId] = departJob;
					this.departCnt++;
					this.dispEmpNum += this.getEmpNum(departJob);
				}
			});
		});
		console.log('alignJob:',this.jobsDatesDeparts,'dispDepartNum: ', this.departCnt,'dispEmpNum:', this.dispEmpNum);
	}
	
	createInitiativeBg(): void {
		const HOURS = 17;
		const START_HOUR = 8;
		const OFFSET = 200;
		const HOURW = 50;
		
		this.hOffset = 0;
		
		this.alignJobs(this.sJobs);
		
		let width = HOURW * HOURS + OFFSET,
		height = (this.dispDateNum + this.dispEmpNum + this.departCnt ) * 22 + 30,
	    container = this.Snap('#svgContainer');

		container.attr({ width: width, height: height });
		container.rect(0, 0, width, height).attr({
			fill: '#FFF',
			stroke: "#AAA",
			strokeWidth: 1
		});
 
		console.log('width: ',width,'height: ',height);

		this.hOffset += 20;
		
		for (var i= 0; i < HOURS; i++){
			container.text(OFFSET+ HOURW*i, this.hOffset, i+START_HOUR+":00").attr({
				font: "100 1em Source Sans Pro",
				textAnchor: "middle",
				fill: "#888"
			});
			
			container.line(OFFSET+ HOURW*i, 0, OFFSET+ HOURW*i, height).attr({
				stroke: '#EEE'
			});
		}
		
		this.container = container;
	}
	
	showSchdule(): void{
		let svg = this.container;
		const TEXT_OFFSET_X = 5;
		const OFFSET = 200;
		const HOURW = 50;
		const START_HOUR = 8;

		Object.keys(this.jobsDatesDeparts).forEach((date) =>{

		// });
		// for(var date in this.jobsDatesDeparts) {
			let dateJob = this.jobsDatesDeparts[date];
			
			this.hOffset += 20;

			let strokeColor: string ='';
			let strokeWidth: number;
			let fillColor: string='';

			if(this.editDate == date){
				fillColor = 'none';
				strokeColor = '#FF9999';
				strokeWidth = 2;
			}else {
				fillColor = '#000';
				strokeColor = '#000';
				strokeWidth = 1;
			}

			svg.text(TEXT_OFFSET_X, this.hOffset, date).attr({
				font: "100 1em Source Sans Pro",
				textAnchor: "left",
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
			}).click(()=>{
				console.log('click and emit date',date);
				this.sendDate.emit(date);
				// this.editDate = date;
			});
			
			for (var depart in dateJob) {
				let departJob: Job[] = dateJob[depart];
				let empOffset: any[] = [];
				let validDepart = false;
				// console.log('depart: ', depart);
				
				this.hOffset += 20;
				
				svg.text(TEXT_OFFSET_X, this.hOffset, this.getDepartName(Number(depart))).attr({
					font: "100 1em Source Sans Pro",
					textAnchor: "left",
					fill: "#000",
				});
				
				let dp = this.getDepartmnet(Number(depart));
				
				if(dp && dp.valid){
					validDepart = true;
				}
				
				departJob.forEach((job) => {
					if (!empOffset[job.empId]) {
						this.hOffset += 20;
						empOffset[job.empId] = this.hOffset;
						
						svg.text(TEXT_OFFSET_X+10, empOffset[job.empId], this.employeesObj.getEmployeeName(job.empId)).attr({
							font: "100 1em Source Sans Pro",
							textAnchor: "left",
							fill: "#000"
						});
					}
					
					let x = OFFSET + HOURW * (job.startN - START_HOUR*60) /60;
					let w = HOURW * (job.endN - job.startN) /60;

					let fillColor: string ='';

					if(this.editItem && (this.editItem.jobId == job.jobId)) {
						fillColor = '#FF9999';
					}else if(validDepart){
						fillColor = '#7ABABC';
					}else {
						fillColor = '#AAA';
					}

					svg.rect(x, empOffset[job.empId]-20, w, 20).attr({
						fill: fillColor,
						stroke: "#EEE",
						strokeWidth: 0.5
					}).click(()=>{
						this.sendJob.emit(job);
						this.editDate = job.date;
					});

					svg.text(x, empOffset[job.empId]-5, job.startT).attr({
						font: "100 1em Source Sans Pro",
						textAnchor: "left",
						fill: "#000",
					});
					
					svg.text(x+w, empOffset[job.empId]-5, job.endT).attr({
						font: "100 1em Source Sans Pro",
						textAnchor: "end",
						fill: "#000",
					});
				});
			}
			this.hOffset += 20;
		// }
		});
	}
	
	getDepartName(departId: number): string{
		return this.departmentsObj.getDepartmentName(departId);
	}
	
	getDepartmnet(departId: number): Department{
		return this.departmentsObj.getDepartment(departId);
	}
	
	
}