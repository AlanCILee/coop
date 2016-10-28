import { Component, OnInit } from '@angular/core';
import { TimeTable } from './time';
import { Comparable } from "../core/comparable";
import { BinarySearchTree, Node } from "../core/binarySearchTree";
// export class Schedule {
// 	schedule: DayilySchedule[] = [];
// 	startD: string;
// 	endD: string;
// }

export class Schedule implements OnInit {
	jobs: Job[] = [];
	jobsBST: BinarySearchTree<Job>;

	constructor(){
		console.log('Schedule class constructor');
	}

	ngOnInit (){
		console.log("ngOnInit of Schdeul");
		this.jobsBST = new BinarySearchTree<Job>();
	}
	
	addJob( date: string,
			empId: number,
            empName: string,
			departName: string,
            startT: string,
            endT: string,
	        ): void{

        let job = new Job(date, empId, empName, departName, startT, endT);
	    console.log("add new job :" + job);
		if(!this.jobsBST)
			this.jobsBST = new BinarySearchTree<Job>();
		this.jobs.push(job);
		this.jobsBST.addNode( new Node<Job>( job ), this.jobsBST.root);
		this.jobsBST.inOrderTraversal(this.jobsBST.root);
    }

	loadSchedule(): void {
		console.log('Initial Load schedule');
		mockSchedule.forEach(( schedule ) => {
			this.addJob( schedule['date'], schedule['empId'], schedule['name'],
				schedule['departName'], schedule['startT'], schedule['endT']);
		});
	}

	getJobs(date: string): Job[] {
		let jobList: Job[] = this.jobs.filter((job)=>{
			return job.date == date;
		});
		return jobList;
	}
    
}

const mockSchedule = [
	{ date: '2016-10-01', empId: 1, name: 'Alan', departName: 'Software' , startT: '09:00' ,endT: '17:00'},
	{ date: '2016-10-01', empId: 2, name: 'Nick', departName: 'Software' , startT: '09:30' ,endT: '17:15'},
	{ date: '2016-10-01', empId: 3, name: 'Aaron', departName: 'Sales' , startT: '09:15' ,endT: '15:45'},
	{ date: '2016-10-01', empId: 4, name: 'Max', departName: 'Sales' , startT: '09:45' ,endT: '17:00'},
	{ date: '2016-10-02', empId: 1, name: 'Alan', departName: 'Software' , startT: '09:00' ,endT: '12:00'},
	{ date: '2016-10-02', empId: 1, name: 'Alan', departName: 'Software' , startT: '14:00' ,endT: '17:00'},
	{ date: '2016-10-02', empId: 2, name: 'Nick', departName: 'HR' , startT: '09:00' ,endT: '17:00'},
];

export class Job implements Comparable<Job>{
	lDuration: number;
	dDuration: number;
	startN: number;
	endN: number;

	constructor(
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

