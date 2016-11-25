
import { Response } from "@angular/http";
import { HttpComponent } from '../core/http.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Employees, Employee, Wage } from "../model/employee";
import { Department, Departments } from "../model/department";
import { TimeTable, Time } from "../model/time";
import { Schedule, Job } from "../model/schedule";
import { ErrorMessage } from "../core/errorMessage";
import { API_ENDPOINT } from "../core/config";

@Component({
    selector: 'mainmenu',
    templateUrl: './mainmenu.component.html',
    styleUrls: ['./mainmenu.component.css'],
    // directives: [ ErrorMessage ]
})

export class MainMenuComponent implements OnInit {
    @ViewChild(ErrorMessage) errorMsg: ErrorMessage;
    
    departments: Department[];
    employees: Employee[];
    timeTable: Time[];
    
    form: FormGroup;
    sJobs: Job[] = [];
    dName: string[];

    editDate: string;
    copyDate: string;
    editItem: any = null;

    LIST_DATE: number = 0;
    LIST_VIEW: string[] = [
        'One Day',
        'One Week',
        'Two Weeks',
        'One Month',
        'A Week from the Day',
        'Two Weeks from the Day',
        'A Month from the Day',
    ];

    copyClass: string = 'visible';
    copyCalendarClass: string ='inVisible';

    constructor(private employeesObj: Employees,
                private departmentsObj: Departments,
                private timeObj: TimeTable,
                private dScheduleObj: Schedule,
                private httpComp: HttpComponent,
                private fb: FormBuilder,) {
    };
    
    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.timeTable = this.timeObj.timeTable;
        
        this.form = this.fb.group({
            // view: ['opt1'],
        	jobId: [ -1 ],
            empId: [ -1 ],
            department: [ '' ],
            startT: [ '00:00' ],
            endT: [ '00:00' ],
            date: [ '' ],
        });
    }

    checkInput(form: any): Object{
        let valid: Object = {};
        
        if(form.endT <= form.startT){
            valid['err'] = 'End time should be later than start time';
        }
        if(!form.empId || !form.department || !form.startT || !form.endT){
            valid['err'] = 'Please select all menu items';
        }
        return valid;
    }
    
    onSubmit(form: any): any {
        console.log('you submitted value: ', form);
        let err: string = this.checkInput(form)['err'];
        
        if(err){
            console.log('Input format has error: ', err);
            this.errorMsg.showErrorMessage(err);
            return;
        }
            
        if( form.jobId > 0){    // update case
            this.httpComp.makePostRequest(API_ENDPOINT+'/upSchedule',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);

                if( Number(response.affectedRows) > 0){
                    console.log('update schedule successfully :', response.affectedRows );
                    this.dScheduleObj.addJob(form.jobId, form.date,
                        // form.empId, this.employeesObj.getEmployeeName(form.empId),
                        form.empId, form.department, form.startT, form.endT, true);
                }else{
                    console.log('department insert fail');
                }
                this.clearInput();
                // this.sJobs = this.dScheduleObj.getJobs(this.editDate, this.LIST_DATE);
                this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
                    this.sJobs = list;
                    console.log('ngOnInit() jobs:', this.sJobs);
                    this.clearInput();
                });
            });
        }else {                 // new Schedule case
            this.httpComp.makePostRequest(API_ENDPOINT+'/newSchedule',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);

                if( Number(response.insertId) > 0){
                    console.log('insert schedule successfully :', response.insertId );
                    this.dScheduleObj.addJob(response.insertId, form.date,
                        form.empId, form.department, form.startT, form.endT, form.date);
                }else{
                    console.log('department insert fail');
                }
                // this.sJobs = this.dScheduleObj.getJobs(this.editDate, this.LIST_DATE);
                this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
                    this.sJobs = list;
                    console.log('ngOnInit() jobs:', this.sJobs);
                    this.clearInput();
                });
            });
        }
        return false;
    }

    dateChanged(str: string){
        this.editDate = str;
        console.log('got message from Calendar: ' + str);
        // this.sJobs = this.dScheduleObj.getJobs(str, Number(this.LIST_DATE));
        this.dScheduleObj.getJobs(str, Number(this.LIST_DATE),(list: Job[])=>{
            this.sJobs = list;
            console.log('dateChanged jobs:', this.sJobs);
        });
    }

    copyDateChanged(str: string){
        console.log('copyDateChanged message from Calendar: ' + str);
        this.copyDate = str;
    }

    copy(){
        if(this.copyCalendarClass == 'inVisible'){
            this.copyCalendarClass = 'visible';
            this.copyClass = 'invisible';
        }
    }

    copyCancel(){
        this.copyCalendarClass = 'inVisible';
        this.copyClass = 'visible';
        this.copyDate = null;
    }

    copySubmit(){
        console.log('copy schedule from', this.editDate, 'To ', this.copyDate);

        if(this.editDate == this.copyDate){
            console.log('Error : copy to same date');
            return;
        }

        let dateJobs: Job[] = this.sJobs.filter((job)=>{
            return (job.date == this.editDate);
        });

        dateJobs.forEach((job) => {
            job.date = this.copyDate;
        });

        // this.httpComp.makePostRequest(API_ENDPOINT+'/copySchedule', JSON.stringify(dateJobs)).subscribe((res : Response) => {
        this.httpComp.makePostRequest(API_ENDPOINT+'/copySchedule', { copyData:JSON.stringify(dateJobs)}).subscribe((res : Response) => {
            let response = res.json();
            console.log('HttpComponent : ',response);


            if( response.length > 0){
                console.log('copy schedule successfully :', response.insertId );
            }else{
                console.log('copy schedule fail');
            }
            // this.sJobs = this.dScheduleObj.getJobs(this.editDate, this.LIST_DATE);
            this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
                this.sJobs = list;
                console.log('ngOnInit() jobs:', this.sJobs);
                this.clearInput();
            }, true);

        });

        this.copyCancel();
    }

    onChange(dateOption: number) {
        console.log(dateOption);
        this.LIST_DATE = dateOption;
        // this.sJobs = this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE));
        this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
            this.sJobs = list;
            console.log('onChange jobs:', this.sJobs);
        });
    }

    // Select job for edit
    selectJob(job: Job){
    	console.log('select Job: ', job);
	    this.form.patchValue({
		    jobId: job.jobId,
            empId: job.empId,
		    department: job.departId,
		    startT: job.startT,
		    endT: job.endT,
		    date: job.date
	    });

        this.editItem = job;
    }

    clearInput(): void{
        this.form.patchValue({
            jobId: -1,
            empId: -1,
            department: '',
            startT: '00:00',
            endT: '00:00',
        });
        this.editItem = null;
    }

    deleteItem(): void{
        console.log('Click delete Job');

        this.httpComp.makePostRequest(API_ENDPOINT+'/rmSchedule', {jobId: this.editItem.jobId}).subscribe((res : Response) => {
            let response = res.json();
            console.log('HttpComponent : ',response);

            if( Number(response.affectedRows) > 0){
                console.log('remove schedule successfully :', response.affectedRows );
                this.dScheduleObj.deleteJob(this.editItem.jobId);
                // this.dScheduleObj.addJob(response.insertId, form.date,
                //     form.empId, this.employeesObj.getEmployeeName(form.empId),
                //     form.department, form.startT, form.endT);
            }else{
                console.log('department insert fail');
            }
            // this.sJobs = this.dScheduleObj.getJobs(this.editDate, this.LIST_DATE);
            this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
                this.sJobs = list;
                console.log('ngOnInit() jobs:', this.sJobs);
                this.clearInput();
            });
        });
    }

    getDepartmentName(departId: number):string{
        return this.departmentsObj.getDepartmentName(departId);
    }

    getEmployeeName(empId: number):string{
        console.log()
        return this.employeesObj.getEmployeeName(empId);
    }
}



