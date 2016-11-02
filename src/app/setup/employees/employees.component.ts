import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


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
    modeAdd: boolean = true;
    btnName: string = 'Add';
    
    form : FormGroup;

    constructor(private employeesObj: Employees,
            private departmentsObj: Departments,
            private fb: FormBuilder){

    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.form = this.fb.group({
            name: [ '' ],
            department: [ '' ],
            phone: [ '' ],
            wage: [ '' ],
        })
    }

    getDepartName(departId: number){
        // console.log('call getDepartmentName in employee');
        return this.departmentsObj.getDepartmentName(departId);
    }

    getEmployee(employeeId: number): void{
        let selectedEmp: Employee = this.employeesObj.getEmployee(employeeId);
        if(!selectedEmp){
            console.log("employees: Invalid Employee ID");
        }else{
            console.log("employees: Get Employee info",selectedEmp.empName);

            this.form.patchValue({
                name: selectedEmp.empName,
                department: this.getDepartName(selectedEmp.departId),
                phone: selectedEmp.empPhone,
                wage: selectedEmp.wages.wage
            });
        }
    }

    Up() {
        console.log("UP:"+this.cnt++);
    }
    
    clearInput(): void{
        this.form.patchValue({
            name: '',
            department: '',
            phone: '',
            wage: ''
        });
    }
    
    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
        this.modeAdd = false;
        this.modeEdit = false;
        this.clearInput();
    }

    addBtn(): void {
        this.clearInput();
        this.btnName = 'Add';
        this.modeAdd = true;
        this.modeEdit = false;
    }

    empBtn(empId: number): void {
        console.log('click Employee ID: ', empId);
        this.btnName = 'Update';
        this.modeAdd = false;
        this.modeEdit = true;
        this.getEmployee(empId);
    }
}