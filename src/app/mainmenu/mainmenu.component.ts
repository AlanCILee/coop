
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
    
    form: FormGroup;
    sId: number;
    sName: string;
    sDepartment: string;
    sStartT: string;
    sEndT: string;
    
    sJobs: Job[] = [];
    dJobs: any[][];
    dName: string[];
    
    editJob: Job;
    editDate: string;
    
    public currentDate: Date = new Date();
    
    constructor(private employeesObj: Employees,
                private departmentsObj: Departments,
                private timeObj: TimeTable,
                private dScheduleObj: Schedule,
                private fb: FormBuilder,) {
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
    
    ngOnChange(): void {
        // this.form = this.fb.group({
        //     // name: [ this.eName, Validators.required ],
        //     // department: [ this.eDepartment, Validators.required],
        //     // phone: [ this.ePhone, Validators.required],
        //     // wage: [ this.eWage, Validators.required],
        //     name: [ '' ],
        //     department: [ '' ],
        //     startT: [ '' ],
        //     endT: [ '' ],
        //     date: [ '' ],
        // })
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
        this.editDate = str;
        console.log('got message from Calendar: ' + str);
        this.sJobs = this.dScheduleObj.getJobs(str);
        console.log('ngOnInit() jobs:', this.sJobs);

    }
    
    // Select job for edit
    selectJob(job: Job){
        this.sId = job.empId;
        this.sName = job.empName;
        this.sDepartment = job.departName;
        this.sStartT = job.startT;
        this.sEndT = job.endT;
        
        this.btnName = 'Edit';
        this.editJob = job;
    
        this.modeAdd = false;
        this.modeEdit = true;
    }
    
    deleteJob(): void{
        console.log('Click delete Job');
        this.dScheduleObj.deleteJob(this.editJob.jobId);
        this.sJobs = this.dScheduleObj.getJobs(this.editDate);
        //ToDo
        //DataBaseControl
    }
}



