import { Injectable } from "@angular/core";

@Injectable()
export class Employees {
    employees: Employee[] = [];

    addEmployee(empId: number,
                empName: string,
                departId: number,
                empPhone: string,
                wage: Wage,
                // wage: number,
                ): void{
	    //
    	// if(empId < 0){
    	// 	this.employees.push(
    	// 		new Employee(empId, empName, departId, empPhone, wages, true)
		 //    );
	    // }else {
	    
	    let updateEmp: boolean = false;
	    
        this.employees.forEach((emp) => {
            if(emp.empId == empId){
                emp.empName = empName;
		        emp.departId = departId;
		        emp.empPhone = empPhone;
	            if(wage)
		            emp.wages.push(wage);
		        // let latestWage: number = emp.getLatestWage().wage;
		        // if(latestWage != wage.wage){
                 //    emp.wages.push(wage);
		        // }
		        // emp.valid = valid;
	            updateEmp = true;
	        }
	    });
	    
	    if(!updateEmp){         // new Employee case
		    let wages: Wage[] = [wage];
	        this.employees.push(
	            new Employee(empId, empName, departId, empPhone, wages, true)
	        );
	    }
    		//
		// if(valid){
         //    this.employees.push( new Employee(empId,
	     //        empName, departId, empPhone, wage, true));
		// }else{
		//     this.employees.forEach((employee)=> {
		// 	    if (employee.empId == empId) {
		// 		    employee.valid = false;
		// 	    }
		//     });
		// }
        console.log('after addedEmployee: ', this.employees);
    }

	removeEmployee(emp: Employee): void{
		console.log('removeEmployee : ', emp);
		this.employees.forEach((employee)=> {
			if (employee.empId == emp.empId) {
				employee.valid = false;
			}
		});
		//
		// let index = this.employees.indexOf(emp);
		// this.employees.splice( index, 1 );
	}

    loadEmployee(employees: Object[]): void {
        employees.forEach(( emp ) => {
			let wages:Wage[] = [];
	        
	        emp['wages'].forEach((wage: Wage)=>{
	        	wages.push(new Wage(wage.wage, wage.date));
	        });
        	
	        this.employees.push(
		        new Employee( emp['empid'], emp['name'], emp['depart'], emp['phone'], wages, true)
	        );
	        // this.addEmployee( emp['empid'], emp['name'], emp['depart'], emp['phone'], emp['wage'], true);
        });
	    
	    console.log('loadEmployee: ', employees);
    }

    initEmployee(){
        console.log('initEmployee Loading Employee');
        this.loadEmployee(mockEmployees);
    }

    getEmployeeName(employeeId: number): string{
            console.log('getEmployeeName :'+ employeeId);
            let employee: Employee = null;

            this.employees.forEach((emp) => {
                if(emp.empId == employeeId)
                    employee = emp;
            });

            return employee.empName;
    }

	getEmployee(employeeId: number): Employee{
            console.log('getEmployee :'+ employeeId);
            let employee: Employee = null;

            this.employees.forEach((emp) => {
                if(emp.empId == employeeId)
                    employee = emp;
            });
            return employee;
    }
}


export class Employee {
	constructor(public empId: number,
			public empName: string,
            public departId: number,
			public empPhone: string,
		    public wages: Wage[],
			// public wage: number,
			public valid: boolean){
	    console.log('constructor Employee');
	}

    getLatestWage(): Wage{
		let wagesClone = this.wages.slice();

		wagesClone.sort((wageA, wageB)=>{
			if(wageA.date < wageB.date)
				return 1;
	        if(wageA.date > wageB.date)
	        	return -1;
	        return 0;
		});
		// console.log('After sorting: ', wagesClone);
		return wagesClone[0];
	    // return new Wage(0,'');
    }

	getCurrentWage(date: string): Wage{
		let wagesClone = this.wages.slice();

		wagesClone.sort((wageA, wageB)=>{
			if(wageA.date < wageB.date)
				return 1;
			if(wageA.date > wageB.date)
				return -1;
			return 0;
		});

		let retWage = wagesClone.find((wage)=>{
			return wage.date <= date;
		});

		if(!retWage){
			console.log('wage setting was missing when someone started to work');
			return wagesClone[0];   //return latest wage
		}

		console.log('current Wage: ', date, retWage);
		return retWage;
	    // return new Wage(0,'');
	}
}

export class Wage {
	constructor(public wage: number,
		public date: string){
	}
}

const mockEmployees = [
    { empid: 0, name: 'Alan', phone: '123-456-7890', depart: 0,
	    wages: [{wage: 20, date:'2016-10-30'},
		        {wage: 22, date:'2016-10-01'},
		        {wage: 24, date:'2016-10-15'}]},
    { empid: 1, name: 'Nick', phone: '123-456-7891', depart: 1, wages: [{wage: 30, date:'2016-10-05'}]},
    { empid: 2, name: 'Aaron', phone: '123-456-7892', depart: 2, wages: [{wage: 40, date:'2016-10-09'}]},
    { empid: 3, name: 'Max', phone: '123-456-7893', depart: 3, wages: [{wage: 50, date:'2016-10-01'}]}
];
//
// const mockEmployees = [
//     { empid: 0, name: 'Alan', phone: '123-456-7890', depart: 0, wage: 20},
//     { empid: 1, name: 'Nick', phone: '123-456-7891', depart: 1, wage: 30},
//     { empid: 2, name: 'Aaron', phone: '123-456-7892', depart: 2, wage: 40},
//     { empid: 3, name: 'Max', phone: '123-456-7893', depart: 3, wages: 50}
// ];

