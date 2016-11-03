import { OnInit, Injectable } from "@angular/core";
import { TimeTable } from "./time";

@Injectable()
export class TipModel implements OnInit{
	dailyT : {} = {};
	timeZones: Object =[];

	constructor(private timeTableObj: TimeTable){
	}

	ngOnInit(){
		this.timeZones = this.timeTableObj.timeZones;

	}

	addDailyT(date:string, wages: Object){
		this.dailyT[date] = wages;
	}

	loadMockTips(): void {

		for(var key in mockTips){
			console.log('loadMockWages key:', key);
			console.log('loadMockWages value:', mockTips[key]);
			this.addDailyT(key, mockTips[key]);
		}
		console.log('loadMockWages :', this.dailyT);
	}
	//
	// getTip(date: string, day: number): Job[] {
	// 	let days: string[] = [];
	// 	let momentDay = moment(date);
	//
	// 	days.push(date);
	//
	// 	for(var i=0; i < day; i++){
	// 		days.push(momentDay.add(1,'days').format('YYYY-MM-DD'));
	// 	}
	//
	// 	console.log('getJobs for: ', days);
	//
	// 	let jobList: Job[] = this.jobs.filter((job)=>{
	// 		return days.indexOf(job.date) >= 0;
	// 	});
	//
	// 	return jobList;
	// }
}

const mockTips:{} = {
		'2016-10-01': { Morning : 300, Afternoon: 500 },
		'2016-10-02': { Morning : 350, Afternoon: 550 }
	};
