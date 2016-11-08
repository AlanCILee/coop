import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

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
            private fb: FormBuilder){
    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.form = this.fb.group({
            eId: [ -1 ],
            name: [ '' ],
            department: [ '' ],
            phone: [ '' ],
            wage: [ '' ],
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
            wage: ''
        });
        this.editItem = null;
    }
    
    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
        let now = moment().format('YYYY-MM-DD');

        let newWage: Wage[] = [];
        newWage.push(new Wage(form.wage, now));

        this.employeesObj.addEmployee(form.eId,
            form.name, form.department, form.phone, newWage);
        this.clearInput();
    }

    empBtn(emp: Employee): void {
        console.log('click Employee ID: ', emp);
        this.form.patchValue({
            eId: emp.empId,
            name: emp.empName,
            department: emp.departId,
            phone: emp.empPhone,
            // wage: emp.wages.wage
            wage: emp.getLatestWage().wage,
        });
        this.editItem = emp;
    }

    deleteItem(): void {
        this.employeesObj.removeEmployee(this.editItem);
        this.clearInput();
    }
}
