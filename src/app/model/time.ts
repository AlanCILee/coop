export class TimeTable {
	timeTable: Time[] = [];

	timestring: string = '';
	time: number;

	createTimeTable(): void{
		for (var hour =0; hour < 24; hour++){
			for (var min = 0; min < 60; min+=15){
				this.timestring = this.timeFormatter(hour) + ':' + this.timeFormatter(min);
				this.time = hour * 60 + min;
				console.log(this.timestring, this.time);
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

	getTimeNumber(timeStr: string): number {
		let timeNumber: number = 0;

		this.timeTable.forEach(( time ) => {
			if( time.timeStr == timeStr)
				timeNumber = time.timeNum;
		});

		return timeNumber;
	}
}

export class Time {
	constructor (public	timeStr: string,
			public timeNum: number){
	}
}