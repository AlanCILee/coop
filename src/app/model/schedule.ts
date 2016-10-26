export class Schedule {
	schedule: DayilySchedule[];
}

class DayilySchedule {
	day: string;
	jobs: Job[];
}

class Job {
	lDuration: number;
	dDuration: number;

	constructor(public _empId: number,
		public empName: string,
		public departName: string,
		public startT: string,
		public endT: string,
		_lDuration?: number,
		_dDuration?: number){

		this.lDuration = (16 * 60 - startT) || _lDuration;
		this.dDuration = (endT - 16 * 60) || _dDuration;
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