import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Response } from "@angular/http";

import { Employees, Employee } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { TimeTable } from "../../model/time";
import { TipModel } from "../../model/tip";
import { HttpComponent } from "../../core/http.component";

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
    dailyT: Object;
    editDate: string;

    LIST_DATE: number = 7;
	zoneStr: string[] =[];
	zoneId: string[] =[];

    constructor(private employeesObj: Employees,
            private departmentsObj: Departments,
            private timeObj: TimeTable,
            private tipObj: TipModel,
            private httpComp: HttpComponent,
            ){
    };

    ngOnInit(){
    	console.log("Ng Oninit =====");
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        // this.timeZones = this.timeObj.timeZones;
        this.timeZones = this.timeObj.timeZonesHistory;

	    let group:any ={};

        // for(var key in this.timeZones){
	    Object.keys(this.timeZones).forEach((zoneId)=>{
	    	if(this.timeZones[zoneId].valid){
	            this.zoneStr.push(this.timeZones[zoneId].zoneName);
			    this.zoneId.push(zoneId);
	            group[zoneId] = new FormControl('');
		    }else{
		    }
	    });
	    group['date'] = new FormControl('');
        this.form = new FormGroup(group);
    }

    dateChanged(str: string){
        this.editDate = str;
        this.dailyT = this.tipObj.getTipList(str, this.LIST_DATE);
        console.log('got message from Calendar: ' + str, 'dailyT: ', this.dailyT);
    }

    ngOnAfterViewInit(){
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
		console.log('dayilyT :',this.dailyT);

	    if (date in this.dailyT){   // update case
		    this.httpComp.makePostRequest('http://localhost:3000/upInput',form).subscribe((res : Response) => {
			    let response = res.json();
			    console.log('HttpComponent : ', response);

			    if( Number(response.affectedRows) > 0){
				    console.log('update input successfully :', response.affectedRows );
				    delete form.date;
			        this.tipObj.addDailyT(date, form );
				    this.dailyT = this.tipObj.getTipList(date, this.LIST_DATE);
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
				    this.dailyT = this.tipObj.getTipList(this.editDate, this.LIST_DATE);
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
