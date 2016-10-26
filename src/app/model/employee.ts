import { Injectable } from "@angular/core";

@Injectable()
export class Employees {
    employees: Employee[] = [];

    addEmployee(empId: number,
                empName: string,
                departId: number,
                empPhone?: string,
                wages?: Wage): void{
        console.log('addEmployee: '+ empId +', '+ empName+', ' + departId+', ' + empPhone +', '+wages['wage']);

        let wageObj = new Wage(wages['wage'], wages['date']);
        let employee = new Employee(empId, empName, departId, empPhone, wageObj);
        this.employees.push( employee );
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

    getEmployee(employeeId: number){
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
			public empPhone?: string,
			public wages?: Wage){
	    console.log('constructor Employee');
	}
}

export class Wage {
	constructor(public wage: number,
		public date: string){
	}
}

const mockEmployees = [
    { empid: 1, name: 'Alan', phone: '123-456-7890', depart: 1, wages: {wage: 20, date:'2016-10-01'}},
    { empid: 2, name: 'Nick', phone: '123-456-7891', depart: 2, wages: {wage: 30, date:'2016-10-05'}},
    { empid: 3, name: 'Aaron', phone: '123-456-7892', depart: 4, wages: {wage: 40, date:'2016-10-09'}},
    { empid: 4, name: 'Max', phone: '123-456-7893', depart: 3, wages: {wage: 50, date:'2016-10-01'}}
];

