import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Employees, Employee } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { TimeTable } from "../../model/time";
import { TipModel } from "../../model/tip";

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

    constructor(private employeesObj: Employees,
            private departmentsObj: Departments,
            private timeObj: TimeTable,
            private tipObj: TipModel,
            ){

    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.timeZones = this.timeObj.timeZones;

	    let group:any ={};

        for(var key in this.timeZones){
        	this.zoneStr.push(key);
        	console.log('add formcontrol: ',key);
            group[key] = new FormControl('');
        }
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
	    this.zoneStr.forEach((zone) =>{
	    	console.log('patch value: ', zone);
	    	this.form.patchValue({ [ zone ]: ''});
	    });
    }

    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
	    let date = form.date;
		delete form.date;
        this.tipObj.addDailyT(date, form );

	    this.dailyT = this.tipObj.getTipList(this.editDate, this.LIST_DATE);
        this.clearInput();
    }

    tipSelect(tip: Object): void {
        console.log('click Tip : ', tip);
        for(var key in tip['val']){
                console.log('tipBtn :', key, 'value :',tip['val'][key]);
                this.form.patchValue({ [ key ]: tip['val'][key] });
        }
    }

}
