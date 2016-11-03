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

}

const mockTips:{} = {
		'2016-10-01': { Morning : 300, Afternoon: 500 },
		'2016-10-02': { Morning : 350, Afternoon: 550 }
	};
