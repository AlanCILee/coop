import { Component, OnInit } from '@angular/core';
import { TimeTable } from './time';
import { Comparable } from "../core/comparable";
// import { BinarySearchTree, Node } from "../core/binarySearchTree";
// export class Schedule {
// 	schedule: DayilySchedule[] = [];
// 	startD: string;
// 	endD: string;
// }

export class Schedule implements OnInit {
	jobs: Job[] = [];
	// jobsBST: BinarySearchTree<Job>;

	constructor(){
		console.log('Schedule class constructor');
	}

	ngOnInit (){
		console.log("ngOnInit of Schdeul");
		// this.jobsBST = new BinarySearchTree<Job>();
	}
	
	addJob( jobId: number,
			date: string,
			empId: number,
            empName: string,
			departName: string,
            startT: string,
            endT: string,
	        ): void{

		if(jobId <0 ) {     // ADD Case
			jobId = this.jobs.length+1;
		}else{              // Edit Case
			this.deleteJob(jobId);
		}
		
		let job = new Job(jobId, date, empId, empName, departName, startT, endT);
		this.jobs.push(job);
		//TODO updateDB

	    console.log("add new job :" + job);
    }

	loadSchedule(): void {
		console.log('Initial Load schedule');
		mockSchedule.forEach(( schedule ) => {
			this.addJob( schedule['jobId'], schedule['date'], schedule['empId'], schedule['name'],
				schedule['departName'], schedule['startT'], schedule['endT']);
		});
	}

	getJobs(date: string): Job[] {
		let jobList: Job[] = this.jobs.filter((job)=>{
			return job.date == date;
		});
		return jobList;
	}
	
	deleteJob(jobId : number) : void {
		let newJobs : Job[];
		newJobs = this.jobs.filter((job) => {
			return job.jobId != jobId;
		});
		
		this.jobs = newJobs;
		//ToDO UpdateDB
	}
    
}

const mockSchedule = [
	{ jobId: 1, date: '2016-10-01', empId: 1, name: 'Alan', departName: 'Software' , startT: '09:00' ,endT: '17:00'},
	{ jobId: 2, date: '2016-10-01', empId: 2, name: 'Nick', departName: 'Software' , startT: '09:30' ,endT: '17:15'},
	{ jobId: 3, date: '2016-10-01', empId: 3, name: 'Aaron', departName: 'Sales' , startT: '09:15' ,endT: '15:45'},
	{ jobId: 4, date: '2016-10-01', empId: 4, name: 'Max', departName: 'Sales' , startT: '09:45' ,endT: '17:00'},
	{ jobId: 5, date: '2016-10-02', empId: 1, name: 'Alan', departName: 'Software' , startT: '09:00' ,endT: '12:00'},
	{ jobId: 6, date: '2016-10-02', empId: 1, name: 'Alan', departName: 'Software' , startT: '14:00' ,endT: '17:00'},
	{ jobId: 7, date: '2016-10-02', empId: 2, name: 'Nick', departName: 'HR' , startT: '09:00' ,endT: '17:00'},
];

export class Job implements Comparable<Job>{
	lDuration: number;
	dDuration: number;
	startN: number;
	endN: number;

	constructor(
		public jobId: number,
		public date: string,
		public empId: number,
		public empName: string,
		public departName: string,
		public startT: string,
		public endT: string,) {
			this.startN = this.calTime(startT);
			this.endN = this.calTime(endT);
			this.lDuration = (16 * 60 - this.startN);
			this.dDuration = (this.endN - 16 * 60);
	}

	calTime(timeStr: string): number {
		let timeS: string[] = [];
		let timeN: number = 0;
		timeS = timeStr.split(':');
		timeN = Number(timeS[0]) * 60 + Number(timeS[1]);

		return timeN;
	}

	compareTo (other: Job): number {
		if (this.date > other.date)
			return 1;
		else if (this.date < other.date)
			return -1;
		else
			return 0;
	}
	
	calLDuration (startN:number, endN:number) : number{
		let lDuration: number;
		let setTime = 16 * 60;

		if (startN >= setTime){
			lDuration = 0;
		}else if (endN <= setTime) {
			lDuration = endN - startN;
		}else{
			lDuration = setTime - startN;
		}
		return lDuration;
	}

	calDDuration (startN:number, endN:number) : number{
		let dDuration: number;
		let setTime = 16 * 60;

		if (endN <= setTime){
			dDuration = 0;
		}else if (startN >= setTime) {
			dDuration = endN - startN;
		}else{
			dDuration = endN - setTime;
		}
		return dDuration;
	}
}

