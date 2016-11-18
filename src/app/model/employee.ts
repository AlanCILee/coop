import { Injectable } from "@angular/core";
import { HttpComponent } from "../core/http.component";
import { Response } from "@angular/http";

@Injectable()
export class Employees {
    employees: Employee[] = [];
	
	constructor(
	            private httpComp: HttpComponent,
	            ){}
	
    addEmployee(empId: number,
                empName: string,
                departId: number,
                empPhone: string,
                wage: Wage,
                ratio: number,
                ): void{
	    
	    let updateEmp: boolean = false;
	    
        this.employees.forEach((emp) => {
            if(emp.empId == empId){
                emp.empName = empName;
		        emp.departId = departId;
		        emp.empPhone = empPhone;
	            if(wage)
		            emp.wages.push(wage);
	            emp.ratio = ratio;
	            updateEmp = true;
	        }
	    });
	    
	    if(!updateEmp){         // new Employee case
		    let wages: Wage[] = [wage];
	        this.employees.push(
	            new Employee(empId, empName, departId, empPhone, wages, ratio, true)
	        );
	    }
        console.log('after addedEmployee: ', this.employees);
    }

	removeEmployee(emp: Employee): void{
		console.log('removeEmployee : ', emp);
		this.employees.forEach((employee)=> {
			if (employee.empId == emp.empId) {
				employee.valid = false;
			}
		});
	}
	
    // loadEmployee(employees: Object[]): void {
    //     employees.forEach(( emp ) => {
		// 	let wages:Wage[] = [];
	 //
	 //        emp['wages'].forEach((wage: Wage)=>{
	 //        	wages.push(new Wage(wage.wage, wage.date));
	 //        });
    //
	 //        this.employees.push(
		//         new Employee( emp['empid'], emp['name'], emp['depart'], emp['phone'], wages, true)
	 //        );
    //     });

	initEmployee(): void {
	    this.httpComp.makeRequest('http://localhost:3000/getEmployee').subscribe((res : Response) => {
		    let response = res.json();
		    let response2: any;
		
		    if ( response.err ) {
			    console.log('loadEmployees Fail :');
		    }else{
			    console.log('loadEmployees from DB :', response);
	            this.httpComp.makeRequest('http://localhost:3000/getWage').subscribe((res2 : Response) => {
		            response2 = res2.json();
		            console.log('load wages', response2);
	            	if ( response2.err ) {
			            console.log(response.err);
	                }else {
	                	response.forEach((emp:any)=>{
				            let wages: Wage[] = [];
			                response2.forEach((wage:any) => {
					            if(wage['empId'] == emp['empId']){
						            wages.push(new Wage(wage['empId'], wage['date']));
					            }
				            });
			                
			                if(wages.length == 0)
			                    wages.push(new Wage(1, '1999-12-31 00:00:00'));
				
				            this.employees.push(
					            new Employee( emp['empId'], emp['name'], emp['departId'], emp['phone'], wages, emp['ratio'], emp['valid'])
				            );
			            });
	                    console.log('loadEmployee: ', this.employees);
	                }
	            });
		    }
        });
    }

    // initEmployee():Promise<string>{
    	// return new Promise((resolve, reject)=> {
	    //     console.log('start initEmployee Promise ===============');
	    //     this.loadEmployee(mockEmployees);
		 //    resolve('Finished Loading Employee Promise ==============');
	    // });

	// asyncfunction():Promise<string> {
	// 	return new Promise((resolve, reject)=>{
	// 		setTimeout(()=>resolve("Hello world!"), 1000);
	// 	});
	// }

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
	
	
	getEmployeeRatio(employeeId: number): number{
		console.log('getEmployeeRatio :', employeeId);
		let employee: Employee = null;
		
		this.employees.forEach((emp) => {
			if(emp.empId == employeeId)
				employee = emp;
		});
		return employee.ratio;
	}
}


export class Employee {
	constructor(public empId: number,
			public empName: string,
            public departId: number,
			public empPhone: string,
		    public wages: Wage[],
	        public ratio: number,
			public valid: boolean,
			){
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

// const mockEmployees = [
//     { empid: 0, name: 'Alan', phone: '123-456-7890', depart: 0,
// 	    wages: [{wage: 20, date:'2016-10-30'},
// 		        {wage: 22, date:'2016-10-01'},
// 		        {wage: 24, date:'2016-10-15'}]},
//     { empid: 1, name: 'Nick', phone: '123-456-7891', depart: 1, wages: [{wage: 30, date:'2016-10-05'}]},
//     { empid: 2, name: 'Aaron', phone: '123-456-7892', depart: 2, wages: [{wage: 40, date:'2016-10-09'}]},
//     { empid: 3, name: 'Max', phone: '123-456-7893', depart: 3, wages: [{wage: 50, date:'2016-10-01'}]}
// ];

