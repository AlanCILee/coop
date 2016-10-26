import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../model/employee";
import { Department, Departments } from "../model/department";

@Component({
    selector: 'employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
    cnt: number = 0;
    employees: Employee[];
    // departments: Department[];

    constructor(private employeesObj: Employees,
            private departmentsObj: Departments){

    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        // this.departments = this.departmentsObj.department;
    }

    getDepartName(departId: number){
        console.log('call getDepartmentName in employee');
        return this.departmentsObj.getDepartmentName(departId);

    }

    Up() {
        console.log("UP:"+this.cnt++);
    }
}