import { OnInit, Injectable } from "@angular/core";
import { TimeTable } from "./time";
import * as moment from 'moment';

@Injectable()
export class TipModel implements OnInit{
	dailyT : Object = {};
	timeZones: Object =[];

	constructor(private timeTableObj: TimeTable){
	}

	ngOnInit(){
		this.timeZones = this.timeTableObj.timeZones;

	}

	addDailyT(date:string, wages: Object){
		console.log('addDailyT :', date, wages);
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

	initTip(): void {


	}

	getTipList(date: string, day: number): Object {
		let days: string[] = [];
		let listT: Object = {};
		let momentDay = moment(date);

		days.push(date);

		for(var i=0; i < day; i++){
			days.push(momentDay.add(1,'days').format('YYYY-MM-DD'));
		}

		for (var key in this.dailyT){
			console.log('key :', key);
			if( days.indexOf(key) >=0 )
				listT[key] = this.dailyT[key];
		}
		return listT;
	}
}

const mockTips:{} = {
		'2016-10-01': { Morning : 300, Afternoon: 500 },
		'2016-10-02': { Morning : 350, Afternoon: 550 }
	};
