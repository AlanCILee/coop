import { Injectable } from "@angular/core";
import { HttpComponent } from "../core/http.component";
import { Response } from "@angular/http";

@Injectable()
export class TimeTable {
	timeTable: Time[] = [];
	timeZonesHistory: Object = [];
	timeZones: Object =[];              //current timezone
	timestring: string = '';
	time: number;

	constructor(
		private httpComp: HttpComponent,){}

	createTimeTable(): void{
		for (var hour =0; hour < 24; hour++){
			for (var min = 0; min < 60; min+=15){
				this.timestring = this.timeFormatter(hour) + ':' + this.timeFormatter(min);
				this.time = hour * 60 + min;
				// console.log(this.timestring, this.time);
				this.timeTable.push(new Time(this.timestring, this.time));
			}
		}
	}

	timeFormatter(time: number): string {
		let retStr: string = '' + time;
		if(retStr.length < 2){
			retStr = '0' + time;
		}
		return retStr;
	}

	timeToDuration(time: string): number {
		let duration: number = 0;
		let timeStr: string[] =[];

		timeStr = time.split(':');
		duration = Number(timeStr[0]) * 60 + Number(timeStr[1]);
		return duration;
	}

	getTimeNumber(timeStr: string): number {
		let timeNumber: number = 0;

		this.timeTable.forEach(( time ) => {
			if( time.timeStr == timeStr)
				timeNumber = time.timeNum;
		});

		return timeNumber;
	}

	addTimeZone(zId: number, zName: string, sT: string, eT: string, valid: boolean): void {
		this.timeZonesHistory[zId] = new TimeZone(
			zId, zName,
			new Time(sT, this.getTimeNumber(sT)),
			new Time(eT, this.getTimeNumber(eT)),
			valid
		);
		
		if(valid){
			this.timeZones[zName] = new TimeZone(
				zId, zName,
				new Time(sT, this.getTimeNumber(sT)),
				new Time(eT, this.getTimeNumber(eT)),
				valid
			);
		}else{
			delete this.timeZones[zName];
		}
		console.log('addTimeZone: ', this.timeZonesHistory);
	}

	removeTimeZone(zoneId: number, zoneName: string): void{
		this.timeZonesHistory[zoneId].valid = false;
		
		
		delete this.timeZones[zoneName];
		console.log('removeTimeZone : ', zoneName);
	}

	loadMockTimeZone(): void{
		mockTimeZone.forEach((zone) =>{
			this.addTimeZone(zone.id, zone.zoneName, zone.sT, zone.eT, zone.valid );
		});
	}

	initTimeZone(){
		// this.loadMockTimeZone();

		this.httpComp.makeRequest('http://localhost:3000/getTimeZone').subscribe((res : Response) => {
			let response = res.json();
			// let response2: any;

			if ( response.err ) {
				console.log('loadTimezone Fail :');
			}else{
				console.log('loadTimezone from DB :', response);
				// this.departments.push(new Department( departId, departName, ratio, true ));
				response.forEach((zone: any)=>{
					this.timeZonesHistory[zone.zoneId] = new TimeZone(
						zone.zoneId, zone.zoneName,
						new Time(zone.startT, this.getTimeNumber(zone.startT,)),
						new Time(zone.endT, this.getTimeNumber(zone.endT)),
						zone.valid
					);
				});
				console.log('initTimeZone Loading Timezone',this.timeZonesHistory);
			}
		});

		this.createTimeTable();
	}
}

export class TimeZone {
	constructor (
		public zoneId: number,
		public zoneName: string,
		public startT: Time,
		public endT: Time,
		public valid: boolean){
	}
}

export class Time {
	constructor (public	timeStr: string,
			public timeNum: number){
	}
}

const mockTimeZone = [
	{id: 1, zoneName: 'Morning', sT:'08:00', eT:'14:00', valid: true},
	{id: 2, zoneName: 'Afternoon', sT:'14:00', eT:'22:00', valid: true},
];

