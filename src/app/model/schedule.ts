import {Component, OnInit, Injectable } from '@angular/core';
import { TimeTable } from './time';
import { Comparable } from "../core/comparable";
import * as moment from 'moment';
import { HttpComponent } from "../core/http.component";
import { Response } from "@angular/http";
import { Employees } from "./employee";
import {API_ENDPOINT} from "../core/config";

@Injectable()
export class Schedule implements OnInit {
	jobs: Job[] = [];
	startD: string;
	endD: string;
	initialize: boolean = false;
	// jobsBST: BinarySearchTree<Job>;

	constructor(
		private httpComp: HttpComponent,
		private employeeObj: Employees,){}

	ngOnInit (){
		console.log("ngOnInit of Schedule");
		// this.jobsBST = new BinarySearchTree<Job>();
	}
	
	addJob( jobId: number,
			date: string,
			empId: number,
            // empName: string,
			departId: number,
            startT: string,
            endT: string,
	        valid: boolean,
	        ): void{

		// if(jobId <0 ) {     // ADD Case
		// 	jobId = this.jobs.length+1;
		// 	// let job = new Job(jobId, date, empId, empName, departId, startT, endT);
		// 	let job = new Job(jobId, date, empId, departId, startT, endT, valid);
		// 	this.jobs.push(job);
		// 	console.log("add new job :", job);
		// }else {
			let updateJob = this.getJob(jobId);

			if (updateJob) {
				updateJob.date = date;
				updateJob.empId = empId;
				// updateJob.empName = empName;
				updateJob.departId = departId;
				updateJob.startT = startT;
				updateJob.endT = endT;
				updateJob.startN = updateJob.calTime(startT);
				updateJob.endN = updateJob.calTime(endT);
				updateJob.valid = valid;
				console.log("update job :", updateJob);
			} else {
				// let job = new Job(jobId, date, empId, empName, departId, startT, endT);
				let job = new Job(jobId, date, empId, departId, startT, endT, valid);
				this.jobs.push(job);
				console.log("Import job :", job);
			}
		// }

		//TODO updateDB

    }

	loadSchedule(sDate:string, eDate:string, callback:any) {

		console.log('loadSchedule start');

		if(sDate < this.startD || eDate > this.endD){
			this.startD = moment(sDate).date(1).add(-1,'month').format('YYYY-MM-DD');
			this.endD = moment(eDate).add(1,'month').format('YYYY-MM-DD');

			let period: Object = {
				startD: this.startD,
				endD: this.endD,
			}

			console.log('loadSchedule Loading Schedules', period);

			this.httpComp.makePostRequest(API_ENDPOINT+'/getSchedule', period).subscribe((res : Response) => {
				let response = res.json();

				if ( response.err ) {
					console.log('loadSchedule Fail :');
				}else{
					console.log('loadSchedule from DB :', response);
					this.jobs = [];
					response.forEach((schedule: any)=>{
						if(schedule.valid) {
							let job = new Job(schedule.scheduleId, schedule.date, schedule.empId,
								schedule.departId, schedule.startT, schedule.endT, schedule.valid);
							this.jobs.push(job);
						}
					});

					return callback();
				}
			});
		}else{
			console.log('schedule already loaded');
			return callback();
		}
		// mockSchedule.forEach(( schedule ) => {
		// 	this.addJob( schedule['jobId'], schedule['date'], schedule['empId'],
		// 		schedule['departId'], schedule['startT'], schedule['endT']);
		// });
	}

	initSchedule(){
		// let now = moment();
		// this.startD = moment().weekday(1).format('YYYY-MM-DD');
		this.startD = moment().date(1).add(-1,'month').format('YYYY-MM-DD');
		this.endD = moment().add(1,'month').format('YYYY-MM-DD');

		let period: Object = {
			startD: this.startD,
			endD: this.endD,
		}

		console.log('initSchedule Loading Schedules', period);

		this.httpComp.makePostRequest(API_ENDPOINT+'/getSchedule', period).subscribe((res : Response) => {
			let response = res.json();

			if ( response.err ) {
				console.log('initSchedule Fail :');
			}else{
				console.log('initSchedule from DB :', response);
				response.forEach((schedule: any)=>{
					if(schedule.valid){
						let job = new Job(schedule.scheduleId, schedule.date, schedule.empId,
							schedule.departId, schedule.startT, schedule.endT, schedule.valid);
						this.jobs.push(job);
					}
				});
			}
			this.initialize = true;
		});
	}


		// LIST_VIEW: string[] = [
		// 	'Today',                // 0
		// 	'This Week',            // 1
		// 	'This Two Weeks',       // 2
		// 	'This Month',           // 3
		// 	'A Week from Today',    // 4
		// 	'Two Weeks from Today', // 5
		// 	'One Month from Today', // 6
		// ];
	getJobs(date: string, dayOption: number, callback: any) {
		console.log('selected date: ',date, 'viewOption: ', dayOption);
		let days: string[] = [];
		let momentDay = moment(date);
		let viewStart: string;
		let viewEnd: string;

		switch(dayOption){
			case 0:
				viewStart = date;
				viewEnd = date;
				break;

			case 1:
				console.log('case 1');
				viewStart = momentDay.weekday(1).format('YYYY-MM-DD');
				viewEnd = momentDay.add(6,'days').format('YYYY-MM-DD');
				break;

			case 2:
				viewStart = momentDay.weekday(1).format('YYYY-MM-DD');
				viewEnd = momentDay.add(13,'days').format('YYYY-MM-DD');
				break;

			case 3:
				viewStart = momentDay.date(1).format('YYYY-MM-DD');
				viewEnd = momentDay.date(1).add(1,'month').add(-1,'days').format('YYYY-MM-DD');
				break;

			case 4:
				viewStart = date;
				viewEnd = momentDay.add(6,'days').format('YYYY-MM-DD');
				break;

			case 5:
				viewStart = date;
				viewEnd = momentDay.add(13,'days').format('YYYY-MM-DD');
				break;

			case 6:
				viewStart = date;
				viewEnd = momentDay.add(1,'month').add(-1,'days').format('YYYY-MM-DD');
				break;

			default:
				console.log('default option case');
				break;
		}

		console.log('viewStart: ', viewStart, ' viewEnd: ', viewEnd);

		this.loadSchedule(viewStart, viewEnd, ()=>{
			let jobList: Job[] = this.jobs.filter((job)=>{
				return job.date >= viewStart && job.date <= viewEnd;
			});
			console.log("after loadSchedule: ",jobList);
			return callback(jobList);
		});
	}

	getJob(jobId: number): Job {
		let retJob: Job = null;

		this.jobs.forEach((job) => {
			if(job.jobId == jobId)
				retJob = job;
		});

		return retJob;
	}

	deleteJob(jobId : number) : void {
		let newJobs : Job[];
		newJobs = this.jobs.filter((job) => {
			return job.jobId != jobId;
		});
		
		this.jobs = newJobs;
	}
    
}

const mockSchedule = [
	{ jobId: 1, date: '2016-10-01', empId: 0, name: 'Alan', departName: 'Software' , startT: '09:00' ,endT: '17:00'},
	{ jobId: 2, date: '2016-10-01', empId: 1, name: 'Nick', departName: 'Software' , startT: '09:30' ,endT: '17:15'},
	{ jobId: 3, date: '2016-10-01', empId: 2, name: 'Aaron', departName: 'Sales' , startT: '09:15' ,endT: '15:45'},
	{ jobId: 4, date: '2016-10-01', empId: 3, name: 'Max', departName: 'Sales' , startT: '09:45' ,endT: '17:00'},
	{ jobId: 5, date: '2016-10-02', empId: 0, name: 'Alan', departName: 'Software' , startT: '09:00' ,endT: '12:00'},
	{ jobId: 6, date: '2016-10-02', empId: 0, name: 'Alan', departName: 'Software' , startT: '14:00' ,endT: '17:00'},
	{ jobId: 7, date: '2016-10-02', empId: 2, name: 'Nick', departName: 'HR' , startT: '09:00' ,endT: '17:00'},
];

export class Job implements Comparable<Job>{
	// lDuration: number;
	// dDuration: number;
	startN: number;
	endN: number;

	constructor(
		public jobId: number,
		public date: string,
		public empId: number,
		// public empName: string,
		public departId: number,
		public startT: string,
		public endT: string,
		public valid: boolean) {
			this.startN = this.calTime(startT);
			this.endN = this.calTime(endT);
			// this.lDuration = (16 * 60 - this.startN);
			// this.dDuration = (this.endN - 16 * 60);
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
	//
	// calLDuration (startN:number, endN:number) : number{
	// 	let lDuration: number;
	// 	let setTime = 16 * 60;
	//
	// 	if (startN >= setTime){
	// 		lDuration = 0;
	// 	}else if (endN <= setTime) {
	// 		lDuration = endN - startN;
	// 	}else{
	// 		lDuration = setTime - startN;
	// 	}
	// 	return lDuration;
	// }
	//
	// calDDuration (startN:number, endN:number) : number{
	// 	let dDuration: number;
	// 	let setTime = 16 * 60;
	//
	// 	if (endN <= setTime){
	// 		dDuration = 0;
	// 	}else if (startN >= setTime) {
	// 		dDuration = endN - startN;
	// 	}else{
	// 		dDuration = endN - setTime;
	// 	}
	// 	return dDuration;
	// }
}

