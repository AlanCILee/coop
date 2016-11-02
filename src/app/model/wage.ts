import { OnInit } from "@angular/core";

import { TimeTable } from "./time";

export class Wage implements OnInit{
	dailyT : Object[];
	timeZones: Object =[];
	constructor(private timeTableObj: TimeTable){
	}

	ngOnInit(){
		this.timeZones = this.timeTableObj.timeZones;

	}

	addDailyT(date:string, ...args){
		this.dailyT[date] = args;
	}
}

