
import { Response } from "@angular/http";
import { HttpComponent } from '../core/http.component';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Employees, Employee, Wage } from "../model/employee";
import { Department, Departments } from "../model/department";
import { TimeTable, Time } from "../model/time";
import { Schedule, Job } from "../model/schedule";



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
    sId: number;
    sName: string;
    sDepartment: string;
    sStartT: string;
    sEndT: string;

    sJobs: Job[] =[];
    dJobs: any[][];
    dName: string[];

    public currentDate:Date = new Date();

    constructor(private employeesObj: Employees,
                private departmentsObj: Departments,
                private timeObj: TimeTable,
                private dScheduleObj: Schedule,
                private fb: FormBuilder,){
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

    onSubmit(form: any): any {
        console.log('you submitted value: ', form);
        let idName: string[] = [];
        idName = form.name.split(',');

        this.dScheduleObj.addJob(
            -1,
            form.date,
            Number(idName[0]),
            idName[1],
            form.department,
            form.startT,
            form.endT,
            // this.timeObj.timeToDuration(form.startT),
            // this.timeObj.timeToDuration(form.endT)
        );

        this.modeAdd = false;
        this.modeEdit = false;
        return false;
    }

    addBtn(): void {
        // this.clearInput();
        this.btnName = 'Add';
        this.modeAdd = true;
        this.modeEdit = false;
    }

    dateChanged(str: string){
        let departJobs: any[][] =[];
        let departName: string[] = [];

        console.log('got message from Calendar: ' + str);
        this.sJobs = this.dScheduleObj.getJobs(str);


        console.log('ngOnInit() jobs:', this.sJobs);
        // let cnt = 0;
        // this.departments.forEach((department)=>{
        //     // departJobs[cnt] = [];
        //     // departJobs[cnt] = this.sJobs.filter((job)=>{
        //     //     return job.departName == department.departName;
        //     // });
        //     // cnt++;
        //     departName.push(department.departName);
        //     departJobs[department.departName] = [];
        //     departJobs[department.departName] = this.sJobs.filter((job)=>{
        //         return job.departName == department.departName;
        //     });
        //
        // });
        //
        // this.dJobs = departJobs;
        // this.dName = departName;
        // console.log('ngOnInit() dispschedule:', departJobs);
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


