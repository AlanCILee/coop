
import { Response } from "@angular/http";
import { HttpComponent } from '../module/http.component';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Employees, Employee, Wage } from "../model/employee";
import { Department, Departments } from "../model/department";
import { TimeTable, Time } from "../model/time";



@Component({
    selector: 'mainmenu',
    templateUrl: './mainmenu.component.html',
    styleUrls: ['./mainmenu.component.css']
})
export class MainMenuComponent implements OnInit {
    loading: boolean;
    btnName: string;
    modeAdd: boolean;
    modeEdit: boolean;

    departments: Department[];
    employees: Employee[];
    timeTable: Time[];

    form : FormGroup;
    sName: string;
    sDepartment: string;
    sStartT: string;
    sEndT: string;

    public currentDate:Date = new Date();

    constructor(private employeesObj: Employees,
                private departmentsObj: Departments,
                private timeObj: TimeTable,
                private fb: FormBuilder){
    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.timeTable = this.timeObj.timeTable;
        this.form = this.fb.group({
            // name: [ this.eName, Validators.required ],
            // department: [ this.eDepartment, Validators.required],
            // phone: [ this.ePhone, Validators.required],
            // wage: [ this.eWage, Validators.required],
            name: [ '' ],
            department: [ '' ],
            startT: [ '' ],
            endT: [ '' ],
            date: [ '' ],
        })
    }

    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
        this.modeAdd = false;
        this.modeEdit = false;
    }

    addBtn(): void {
        // this.clearInput();
        this.btnName = 'Add';
        this.modeAdd = true;
        this.modeEdit = false;
    }
}



// data:Object;
//
// constructor(private httpComponent: HttpComponent){
//
// }
//
// request(): void {
//     console.log('request() input');
//     this.httpComponent.makeRequest('http://localhost:3000/emp').subscribe((res: Response) => {
//         this.data = res.json();
//         this.loading = false;
//         console.log('HttpComponent : ' + JSON.stringify(this.data));
//     });
// }


