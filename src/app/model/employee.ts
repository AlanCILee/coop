import { Injectable } from "@angular/core";

@Injectable()
export class Employees {
    employees: Employee[] = [];

    addEmployee(empId: number,
                empName: string,
                departId: number,
                empPhone: string,
                wages: Wage[]): void{
        console.log('addEmployee: ', empId, ', ', empName,', ',departId, ', ', empPhone, ', ',wages);

	    if(empId < 0) {
            this.employees.push( new Employee(this.employees.length,
	            empName, departId, empPhone, wages));
	    }else {
	    	this.employees.forEach(( employee ) => {
	    		if(employee.empId == empId) {
	    			employee.empName = empName;
				    employee.departId = departId;
				    employee.empPhone = empPhone;
				    employee.wages.push(wages[0]);
			    }
		    });
	    }
        console.log('after addedEmployee: ', this.employees);
    }

	removeEmployee(emp: Employee): void{
		console.log('removeEmployee : ', emp);
		let index = this.employees.indexOf(emp);
		this.employees.splice( index, 1 );
	}

    loadEmployee(employees: Object[]): void {
        employees.forEach(( emp ) => {
            this.addEmployee( emp['empid'], emp['name'], emp['depart'], emp['phone'], emp['wages']);
        });
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

	//
	// getEmployee(employeeId: number){
    //         console.log('getEmployee :'+ employeeId);
    //         let employee: Employee = null;
    //
    //         this.employees.forEach((emp) => {
    //             if(emp.empId == employeeId)
    //                 employee = emp;
    //         });
    //
    //         return employee;
    // }
}


export class Employee {
	constructor(public empId: number,
			public empName: string,
            public departId: number,
			public empPhone: string,
			public wages: Wage[]){
	    console.log('constructor Employee');
	}

    getLatestWage(): Wage{
		let wagesClone = this.wages.slice();

        wagesClone.sort((wageA, wageB)=>{
			if(wageA.date > wageB.date)
				return 1;
	        if(wageA.date < wageB.date)
	        	return -1;
	        return 0;
        });
		console.log('After sorting: ', wagesClone);
	    return wagesClone[wagesClone.length-1];
    }
}

export class Wage {
	constructor(public wage: number,
		public date: string){
	}
}

const mockEmployees = [
    { empid: -1, name: 'Alan', phone: '123-456-7890', depart: 0,
	    wages: [{wage: 20, date:'2016-10-30'},
		        {wage: 22, date:'2016-10-01'},
		        {wage: 24, date:'2016-10-15'}]},
    { empid: -1, name: 'Nick', phone: '123-456-7891', depart: 1, wages: [{wage: 30, date:'2016-10-05'}]},
    { empid: -1, name: 'Aaron', phone: '123-456-7892', depart: 2, wages: [{wage: 40, date:'2016-10-09'}]},
    { empid: -1, name: 'Max', phone: '123-456-7893', depart: 3, wages: [{wage: 50, date:'2016-10-01'}]}
];

