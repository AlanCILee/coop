
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
    departments: Department[];
    employees: Employee[];
    timeTable: Time[];
    
    form: FormGroup;
    sJobs: Job[] = [];
    dName: string[];

    editDate: string;
    editItem: any = null;

    LIST_DATE: number = 7;

    // public currentDate: Date = new Date();
    
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
        	jobId: [ '' ],
            name: [ '' ],
            department: [ '' ],
            startT: [ '' ],
            endT: [ '' ],
            date: [ '' ],
        });
    }
    
    ngOnChange(): void {
        console.log("Mainmenu ngOnChange");
    }

    onSubmit(form: any): any {
        console.log('you submitted value: ', form);

        this.dScheduleObj.addJob(
            form.jobId,
            form.date,
            form.name,      // empId
            this.employeesObj.getEmployeeName(form.name),   // empName
            form.department,
            form.startT,
            form.endT,
        );

        this.clearInput();
        this.sJobs = this.dScheduleObj.getJobs(this.editDate, this.LIST_DATE);
        return false;
    }

    dateChanged(str: string){
        // let departJobs: any[][] =[];
        // let departName: string[] = [];
        this.editDate = str;
        console.log('got message from Calendar: ' + str);
        this.sJobs = this.dScheduleObj.getJobs(str, this.LIST_DATE);
        console.log('ngOnInit() jobs:', this.sJobs);

    }
    // Select job for edit
    selectJob(job: Job){
    	console.log('select Job: ', job);
	    this.form.patchValue({
		    jobId: job.jobId,
		    name: job.empId,
		    department: job.departName,
		    startT: job.startT,
		    endT: job.endT,
		    date: job.date
	    });

        this.editItem = job;
    }

    clearInput(): void{
        this.form.patchValue({
            jobId: -1,
            name: null,
            department: null,
            startT: null,
            endT: null,
        });
        this.editItem = null;
    }

    deleteItem(): void{
        console.log('Click delete Job');
        this.dScheduleObj.deleteJob(this.editItem.jobId);
        this.clearInput();
        
        this.sJobs = this.dScheduleObj.getJobs(this.editDate, this.LIST_DATE);
        //ToDo
        //DataBaseControl
    }
}



