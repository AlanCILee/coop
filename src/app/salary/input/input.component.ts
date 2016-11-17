import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Response } from "@angular/http";

import { Employees, Employee } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { TimeTable } from "../../model/time";
import { TipModel } from "../../model/tip";
import { HttpComponent } from "../../core/http.component";
import { Router, ActivatedRoute }       from '@angular/router';

@Component({
    selector: 'enter',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.css']
})

export class InputComponent implements OnInit {
    employees: Employee[];
    departments: Department[];
    timeZones: Object = [];
    form : FormGroup;
    dailyTDisp: Object;
    editDate: string;
	
	zoneStr: string[] = null;
	zoneId: string[] =[];
	
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
	
    constructor(private employeesObj: Employees,
            private departmentsObj: Departments,
            private timeObj: TimeTable,
            private tipObj: TipModel,
            private router: Router,
            private httpComp: HttpComponent,
            ){
    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        // this.timeZones = this.timeObj.timeZones;
        this.timeZones = this.timeObj.timeZonesHistory;

	    let group:any ={};

        // for(var key in this.timeZones){
	    if(Object.keys(this.timeZones).length > 0) {
		    this.zoneStr = [];
		    Object.keys(this.timeZones).forEach((zoneId)=>{
		        if(this.timeZones[zoneId].valid){
		            this.zoneStr.push(this.timeZones[zoneId].zoneName);
				    this.zoneId.push(zoneId);
		            group[zoneId] = new FormControl('');
			    }else{
			    }
		    });
	    }else{
		    this.router.navigate(['/home']);
	    }
	    group['date'] = new FormControl('');
        this.form = new FormGroup(group);
    }

    dateChanged(str: string){
        console.log('got message from Calendar: ' + str);
        this.editDate = str;
	    // this.dScheduleObj.getJobs(str, Number(this.LIST_DATE),(list: Job[])=>{
		 //    this.sJobs = list;
		 //    console.log('ngOnInit() jobs:', this.sJobs);
	    // });
	    // this.dailyTDisp = this.tipObj.getTipList(str, this.LIST_DATE);
	    this.tipObj.getTipList(this.editDate, Number(this.LIST_DATE), (list: Object) =>{
		    this.dailyTDisp = list;
		    console.log('Get dailyTDisp() :', this.dailyTDisp);
	    });
    }
	
	onChange(dateOption: number) {
		console.log(dateOption);
		this.LIST_DATE = dateOption;
		
		this.tipObj.getTipList(this.editDate, Number(this.LIST_DATE), (list: Object) =>{
			this.dailyTDisp = list;
			console.log('Get dailyTDisp() :', this.dailyTDisp);
		});
		// this.dScheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
		// 	this.sJobs = list;
		// 	console.log('ngOnInit() jobs:', this.sJobs);
		// });
	}

    clearInput(): void{
	    // this.zoneStr.forEach((zone) =>{
	    // 	console.log('patch value: ', zone);
	    // 	this.form.patchValue({ [ zone ]: ''});
	    // });
    }

    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
	    let date = form.date;
		console.log('dayilyT :',this.dailyTDisp);

	    if (date in this.dailyTDisp){   // update case
		    this.httpComp.makePostRequest('http://localhost:3000/upInput',form).subscribe((res : Response) => {
			    let response = res.json();
			    console.log('HttpComponent : ', response);

			    if( Number(response.affectedRows) > 0){
				    console.log('update input successfully :', response.affectedRows );
				    delete form.date;
			        this.tipObj.addDailyT(date, form );
				    // this.dailyTDisp = this.tipObj.getTipList(date, this.LIST_DATE);
				    this.tipObj.getTipList(this.editDate, Number(this.LIST_DATE), (list: Object) =>{
					    this.dailyTDisp = list;
					    console.log('Get dailyTDisp() :', this.dailyTDisp);
				    });
			    }else{
				    console.log('update insert fail');
			    }
		        this.clearInput();
		    });
	    }else{                      // new case
		    this.httpComp.makePostRequest('http://localhost:3000/newInput',form).subscribe((res : Response) => {
			    let response = res.json();
			    console.log('HttpComponent : ', response);

			    if( Number(response.insertId) > 0){
				    console.log('insert input successfully :', response.insertId );
					delete form.date;
			        this.tipObj.addDailyT(date, form );
				    this.tipObj.getTipList(this.editDate, Number(this.LIST_DATE), (list: Object) =>{
					    this.dailyTDisp = list;
					    console.log('Get dailyTDisp() :', this.dailyTDisp);
				    });
			    }else{
				    console.log('input insert fail');
			    }
		        this.clearInput();
		    });
	    }

    }

    tipSelect(tip: Object): void {
        console.log('click Tip : ', tip);
        for(var key in tip['val']){
            console.log('tipBtn :', key, 'value :',tip['val'][key]);
            this.form.patchValue({ [ key ]: tip['val'][key] });
        }
    }

}
