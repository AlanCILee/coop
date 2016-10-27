import { TimeTable } from './time';

export class Schedule {
	schedule: DayilySchedule[];
	startD: string;
	endD: string;
}

export class DayilySchedule {
	day: string;
	jobs: Job[];

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
        this.jobs.push(job);
    }
}

class Job {
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

	calLDuration (startT:number, endT:number) : number{
		let lDuration;
		let setTime = 16 * 60;

		if (startT >= setTime){
			lDuration = 0;
		}else if (endT <= setTime) {
			lDuration = endT - startT;
		}else{
			lDuration = setTime - startT;
		}
		return lDuration;
	}

	calDDuration (startT:number, endT:number) : number{
		let dDuration;
		let setTime = 16 * 60;

		if (endT <= setTime){
			dDuration = 0;
		}else if (startT >= setTime) {
			dDuration = endT - startT;
		}else{
			dDuration = endT - setTime;
		}
		return dDuration;
	}
}