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
	
	ngOnInit (){
		console.log("ngOnInit of Schdeul");
		this.jobsBST = new BinarySearchTree<Job>();
	}
	
	addJob( date: string,
			_empId: number,
            empName: string,
			departName: string,
            startT: string,
            endT: string,
	        startN: number,
	        endN: number): void{

        let job = new Job(date, _empId, empName, departName, startT, endT, startN, endN);
	    console.log("add new job :" + job);
		if(!this.jobsBST)
			this.jobsBST = new BinarySearchTree<Job>();
		this.jobs.push(job);
		this.jobsBST.addNode( new Node<Job>( job ), this.jobsBST.root);
		this.jobsBST.inOrderTraversal(this.jobsBST.root);
    }
    
}

class Job implements Comparable<Job>{
	lDuration: number;
	dDuration: number;

	constructor(
		public date: string,
		public _empId: number,
		public empName: string,
		public departName: string,
		public startT: string,
		public endT: string,
		public startN: number,
		public endN: number,
		){

		this.lDuration = (16 * 60 - startN);
		this.dDuration = (endN - 16 * 60);
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