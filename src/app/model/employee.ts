export class Employee {
	constructor(public empId: number,
			public empName: string,
			public empPhone?: string,
			public wage?: Wage[]){
	}
}

class Wage {
	constructor(public wage: number,
		public date: string){
	}
}