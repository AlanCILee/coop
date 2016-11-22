import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";

import { HttpComponent } from "../core/http.component";
import { Router } from "@angular/router";
import { TipModel } from "../model/tip";
import { TimeTable } from "../model/time";
import { Schedule } from "../model/schedule";
import { Departments } from "../model/department";
import { Employees } from "../model/employee";
import { API_ENDPOINT } from "../core/config";

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	form: FormGroup;
	viewname: string = null;

	constructor(
				private employees: Employees,
				private departments: Departments,
				private schedule : Schedule,
				private timeObj: TimeTable,
				private tipObj: TipModel,
	            private fb: FormBuilder,
	            private router: Router,
	            private httpComp: HttpComponent,) {
	}

	ngOnInit() {
		this.form = this.fb.group({
			id: [ '' ],
			password: [ '' ],
		});
	}

	onSubmit(form: any): void {
		console.log('you submitted value: ', form);

		// this.httpComp.makePostRequest('/login',form).subscribe((res : Response) => {
		this.httpComp.makePostRequest(API_ENDPOINT+'/login',form).subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if('viewname' in response){
				console.log('correct user :', response.viewname);
				sessionStorage.setItem('currentUser', response.viewname);
				
				this.timeObj.initTimeZone();
				this.employees.initEmployee();
				this.departments.initDepartments();
				this.schedule.initSchedule();
				this.tipObj.initTip();
				
				this.router.navigate(['/']);
			}else{
				console.log('invalid user :');
				this.router.navigate(['/']);
			}
		});
	}

	logout(): void{
		// this.httpComp.makeRequest('/logout').subscribe((res : Response) => {
		this.httpComp.makeRequest(API_ENDPOINT+'/logout').subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if(!response.viewname){
				console.log('user ', this.viewname, 'logout');
				this.viewname = null;
				sessionStorage.removeItem('currentUser');
				this.router.navigate(['/']);
			}

			this.form.patchValue({
				id: '',
				password: '',
			});
		});
	}

	getUserName(): string{
		if(sessionStorage.getItem('currentUser'))
			return sessionStorage.getItem('currentUser');
		else
			return null;
	}

}