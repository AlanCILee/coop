import { TimeTable } from './time';

// export class Schedule {
// 	schedule: DayilySchedule[] = [];
// 	startD: string;
// 	endD: string;
// }

export class Schedule {
	jobs: Job[] = [];

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