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
    departments: Department[];
    modeEdit: boolean = false;
    modeAdd: boolean = false;

    eName: string;
    eDepartment: string;
    ePhone: string;
    eWage: number;


    constructor(private employeesObj: Employees,
            private departmentsObj: Departments){

    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.department;
    }

    getDepartName(departId: number){
        // console.log('call getDepartmentName in employee');
        return this.departmentsObj.getDepartmentName(departId);

    }

    getEmployee(employeeId: number){
        let selectedEmp: Employee = this.employeesObj.getEmployee(employeeId);
        if(!selectedEmp){
            console.log("employees: Invalid Employee ID");
        }else{
            console.log("employees: Get Employee info",selectedEmp.empName);
            this.eName = selectedEmp.empName;
            this.eDepartment = this.getDepartName(selectedEmp.departId);
            this.ePhone = selectedEmp.empPhone;
            this.eWage = selectedEmp.wages.wage;
        }

    }

    Up() {
        console.log("UP:"+this.cnt++);
    }

    onSubmit(form: any): void {
        console.log('you submitted value: ', form);

        this.modeAdd = false;
        this.modeEdit = false;
    }

    addBtn(): void {
        this.modeAdd = true;
        this.modeEdit = false;
    }

    empBtn(empId: number): void {
        console.log('click Employee ID: ', empId);
        this.getEmployee(empId);
        this.modeAdd = false;
        this.modeEdit = true;
    }
}
