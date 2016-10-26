import { Component } from '@angular/core';
import { Employees, Employee, Wage } from "../model/employee";

@Component({
    selector: 'employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
    employees: Employee[];

    constructor(employees: Employees){
        employees.initEmployee();
        this.employees = employees.employees;
    };
}