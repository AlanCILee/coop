import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Response } from "@angular/http";
import { HttpComponent } from "../../core/http.component";

import * as moment from 'moment';
import { API_ENDPOINT } from "../../core/config";

@Component({
    selector: 'employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {
    employees: Employee[];
    departments: Department[];
    form : FormGroup;
    editItem: any = null;

    constructor(private employeesObj: Employees,
            private departmentsObj: Departments,
            private httpComp: HttpComponent,
            private fb: FormBuilder){
    }

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.form = this.fb.group({
            eId: [ -1 ],
            name: [ '' ],
            department: [ '' ],
            phone: [ '' ],
            wage: [ 0 ],
            ratio: [ 100 ],
        });
        // this.loadEmployees();
    }

    loadEmployees(): void{
        this.httpComp.makeRequest(API_ENDPOINT+'/getEmployee').subscribe((res : Response) => {
            let response = res.json();
            console.log('Http response : ',response);
        
            if ( response.err ) {
                console.log('loadEmployees Fail :');
            }else{
                console.log('loadEmployees :', response);
            }
            this.clearInput();
        });
    }
    
    getDepartName(departId: number){
        return this.departmentsObj.getDepartmentName(departId);
    }

    clearInput(): void{
        this.form.patchValue({
            eId: -1,
            name: '',
            department: '',
            phone: '',
            wage: 0,
            ratio: 100,
        });
        this.editItem = null;
    }
    
    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        let wage : Object = { wage: form.wage, date: now};
        form.date = now;

        // let newWage: Wage[] = [];
        // newWage.push(new Wage(form.wage, now));
        let newWage: Wage = new Wage(form.wage, now);

        console.log('employee form result: ',form);

        if( form.eId > 0){  // update case
	        let emp = this.employeesObj.getEmployee(form.eId);
		    console.log('form.wage:',form.wage, 'emp.getLatestWage():', emp.getLatestWage());
	        if (form.wage == emp.getLatestWage().wage) {
		        form.date = null;
	        }
	
	        this.httpComp.makePostRequest(API_ENDPOINT+'/upEmployee',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('Http response : ',response);
		
		        if (Number(response.affectedRows) > 0) {
			        console.log('update successfully :', response.changedRows);
			        if (form.date) {
				        this.employeesObj.addEmployee(form.eId,
					        form.name, form.department, form.phone, newWage, form.ratio);
			        } else {
				        this.employeesObj.addEmployee(form.eId,
					        form.name, form.department, form.phone, null, form.ratio);
			        }
		        } else {
			        console.log('invalid user :');
		        }
		
		        //
                // if( Number(response.insertId) > 0){
                //     console.log('update successfully :', response.changedRows );
                //     this.employeesObj.addEmployee(form.eId,
                //         form.name, form.department, form.phone, form.wage, false);
                //     this.employeesObj.addEmployee(response.insertId,
                //         form.name, form.department, form.phone, form.wage, true);
                // }else{
                //     console.log('upEmployee fail');
                // }
                this.clearInput();
            });
	        
        }else {             // insert case
            this.httpComp.makePostRequest(API_ENDPOINT+'/newEmployee',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('Http response : ',response);

                if( Number(response.insertId) > 0){
                    console.log('insert successfully :', response.insertId );
                    this.employeesObj.addEmployee(response.insertId,
                        form.name, form.department, form.phone, newWage, form.ratio);
                }else{
                    console.log('newEmployee fail');
                }
                this.clearInput();
            });
        }
    }

    empBtn(emp: Employee): void {
        console.log('click Employee ID: ', emp);
        this.form.patchValue({
            eId: emp.empId,
            name: emp.empName,
            department: emp.departId,
            phone: emp.empPhone,
            // wage: emp.wage
            wage: emp.getLatestWage().wage,
            ratio: emp.ratio,
        });
        this.editItem = emp;
    }

    deleteItem(): void {
        this.httpComp.makePostRequest(API_ENDPOINT+'/rmEmployee',{ eId: this.editItem.empId}).subscribe((res : Response) => {
            let response = res.json();
            console.log('Http response : ',response);
        
            if( Number(response.affectedRows) > 0){
                this.employeesObj.removeEmployee(this.editItem);
                console.log('emp deleted successfully :', this.editItem );
            }else{
                console.log('deleted Employee fail');
            }
            this.clearInput();
        });
    }
    
    getEmpNumber(): number {
        let cnt: number = 0;
        
        this.employees.forEach((emp)=>{
            if(emp.valid){
                cnt++;
            }
        })
        return cnt;
    }

    checkHighlighted(emp: Employee): boolean{
        if(this.editItem){
            return this.editItem.empId == emp.empId;
        }else{
            return false;
        }
    }
}
