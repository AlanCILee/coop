import { Injectable } from "@angular/core";

@Injectable()
export class TimeTable {
	timeTable: Time[] = [];
	timeZonesHistory: Object = [];
	timeZones: Object =[];              //current timezone
	timestring: string = '';
	time: number;

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

	removeTimeZone(key: string): void{
		console.log('removeTimeZone : ', key);
		delete this.timeZones[key];
	}

	loadMockTimeZone(): void{
		mockTimeZone.forEach((zone) =>{
			this.addTimeZone(zone.id, zone.zoneName, zone.sT, zone.eT, zone.valid );
		});
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

