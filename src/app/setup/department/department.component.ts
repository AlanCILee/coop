import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'department',
    templateUrl: 'department.component.html',
    styleUrls: ['department.component.css']
})

export class DepartmentComponent implements OnInit {
    departments: Department[];
    form : FormGroup;

    constructor(private departmentsObj: Departments,
                private fb: FormBuilder){
    };

    ngOnInit(){
        // this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.form = this.fb.group({
            dId: [ -1 ],
            dName: [ '' ],
            dRatio: [ '' ],
        })
    }
    
    clearInput(): void{
        this.form.patchValue({
            dId: -1,
            dName: '',
            dRatio: ''
        });
    }

    onSubmit(form: any): void{
        console.log('department form result: ',form);
        this.departmentsObj.addDepartment(form.dId, form.dName, Number(form.dRatio));
        this.clearInput();
    }

    depBtn( dep: Department): void {
        console.log('click department: ', dep);

        this.form.patchValue({
            dId: dep.departId,
            dName: dep.departName,
            dRatio: dep.departRatio
        });
    }
}
