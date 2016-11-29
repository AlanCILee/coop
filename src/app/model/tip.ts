import { OnInit, Injectable } from "@angular/core";
import { TimeTable } from "./time";
import * as moment from 'moment';
import { HttpComponent } from "../core/http.component";
import { Response } from "@angular/http";
import {API_ENDPOINT} from "../core/config";

@Injectable()
export class TipModel implements OnInit{
	dailyT : Object = {};
	timeZones: Object =[];
	startD: string;
	endD: string;
	
	constructor(private timeTableObj: TimeTable,
	            private httpComp: HttpComponent,){
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
		this.startD = moment().date(1).add(-1,'month').format('YYYY-MM-DD');
		this.endD = moment().add(1,'month').format('YYYY-MM-DD');
		
		let period: Object = {
			startD: this.startD,
			endD: this.endD,
		}
		console.log('initTip Loading Tips', period);
		
		this.httpComp.makePostRequest(API_ENDPOINT+'/getInput', period).subscribe((res : Response) => {
			let response = res.json();
			let tipObj: Object = {};
			
			if ( response.err ) {
				console.log('initTip Fail :');
			}else{
				console.log('initTip from DB :', response);
				response.forEach((tip: any)=>{
					if(!(tip.date in tipObj)){
						tipObj[tip.date] = {};
					}
					tipObj[tip.date][tip.zoneId] = tip.tip;
				});
				Object.keys(tipObj).forEach((date)=>{
					this.addDailyT(date, tipObj[date]);
				});
			}
		});
	}

	closeTip(){
		console.log('closeTip -----------------------');
		this.dailyT  = {};
		this.timeZones =[];
		this.startD = null;
		this.endD = null;
	}

	getTipList(date: string, dayOption: number, callback: any) {
		console.log('selected date: ',date, 'viewOption: ', dayOption);
		let days: string[] = [];
		let listT: Object = {};
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
		
		this.loadTips(viewStart, viewEnd, ()=>{
			let tipList: Object = {};
			
			Object.keys(this.dailyT).forEach((date) => {
				if(date >= viewStart && date <= viewEnd){
					tipList[date] = this.dailyT[date];
				}
			})
			
			return callback(tipList);
		});
		// days.push(date);
		//
		// for(var i=0; i < day; i++){
		// 	days.push(momentDay.add(1,'days').format('YYYY-MM-DD'));
		// }
		//
		// for (var key in this.dailyT){
		// 	console.log('key :', key);
		// 	if( days.indexOf(key) >=0 )
		// 		listT[key] = this.dailyT[key];
		// }
		// return listT;
	}
	
	loadTips(sDate:string, eDate:string, callback:any) {
		console.log('loadTips start');
		
		if(sDate < this.startD || eDate > this.endD){
			this.startD = moment(sDate).date(1).add(-1,'month').format('YYYY-MM-DD');
			this.endD = moment(eDate).add(1,'month').format('YYYY-MM-DD');
			
			let period: Object = {
				startD: this.startD,
				endD: this.endD,
			}
			
			console.log('loadTips Period', period);
			
			this.httpComp.makePostRequest(API_ENDPOINT+'/getInput', period).subscribe((res : Response) => {
				let response = res.json();
				let tipObj: Object = {};
				
				if ( response.err ) {
					console.log('initTip Fail :');
				}else{
					console.log('initTip from DB :', response);
					response.forEach((tip: any)=>{
						if(!(tip.date in tipObj)){
							tipObj[tip.date] = {};
						}
						tipObj[tip.date][tip.zoneId] = tip.tip;
					});
					Object.keys(tipObj).forEach((date)=>{
						this.addDailyT(date, tipObj[date]);
					});
					return callback();
				}
			});
		}else{
			console.log('schedule already loaded');
			return callback();
		}
	}
}

const mockTips:{} = {
		'2016-10-01': { Morning : 300, Afternoon: 500 },
		'2016-10-02': { Morning : 350, Afternoon: 550 }
	};
