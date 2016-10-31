
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
    sJobs: Job[] = [];
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
        	jobId: [ '' ],
            name: [ '' ],
            department: [ '' ],
            startT: [ '' ],
            endT: [ '' ],
            date: [ '' ],
        });
    
        this.addBtn();
    }
    
    ngOnChange(): void {
        console.log("Mainmenu ngOnChange");
    }

    onSubmit(form: any): any {
        console.log('you submitted value: ', form);
        let idName: string[] = [];
        
        idName = form.name.split(',');
        this.dScheduleObj.addJob(
            form.jobId,
            form.date,
            Number(idName[0]),
            idName[1],
            form.department,
            form.startT,
            form.endT,
        );

        this.clearForm();
        this.modeEdit = false;

        this.sJobs = this.dScheduleObj.getJobs(this.editDate);
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
    	console.log('select Job: ', job);
	    this.form.patchValue({
		    jobId: job.jobId,
		    name: job.empId+','+job.empName,
		    department: job.departName,
		    startT: job.startT,
		    endT: job.endT,
		    date: this.editDate
	    });

	    this.btnName = 'Edit';
        this.editJob = job;
        this.modeAdd = false;
        this.modeEdit = true;
    }

    clearForm(): void{
        this.form.patchValue({
            jobId: -1,
            name: null,
            department: null,
            startT: null,
            endT: null,
        });
    }

    deleteJob(): void{
        console.log('Click delete Job');
        this.dScheduleObj.deleteJob(this.editJob.jobId);
        this.sJobs = this.dScheduleObj.getJobs(this.editDate);
        //ToDo
        //DataBaseControl
    }
}



