import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
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
import { ErrorMessage } from "../core/errorMessage";
import { LogIn } from "../model/login";

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
	@ViewChild(ErrorMessage) errorMsg: ErrorMessage;

	form: FormGroup;

	constructor(
				private employees: Employees,
				private departments: Departments,
				private schedule : Schedule,
				private timeObj: TimeTable,
				private tipObj: TipModel,
				private loginObj: LogIn,
	            private fb: FormBuilder,
	            private router: Router,
	            // private form: FormGroup,
	            private httpComp: HttpComponent,) {

		this.form = this.fb.group({
			id: [ '' ],
			password: [ '' ],
		});
	}

	ngOnInit() {
		this.httpComp.makeRequest(API_ENDPOINT+'/loginCheck').subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if('viewname' in response){
				console.log('correct user :', response.viewname);
				this.loginObj.setCurrentUser(response.viewname);
				this.loginObj.setCurrentCompany(response.companyName);

				this.timeObj.initTimeZone();
				this.employees.initEmployee();
				this.departments.initDepartments();
				this.schedule.initSchedule();
				this.tipObj.initTip();

				this.router.navigate(['/']);
			}else{
				console.log('invalid user :');
				this.closeSystem();
			}
		});
	}

	closeSystem(): void{
		this.loginObj.setCurrentUser(null);
		this.loginObj.setCurrentCompany(null);

		this.timeObj.closeTimeZone();
		this.employees.closeEmployee();
		this.departments.closeDepartment();
		this.schedule.closeSchedule();
		this.tipObj.closeTip();

		if (this.router.url != '/'){
			this.router.navigate(['/']);
		}
	}

	onSubmit(form: any): void {
		console.log('you submitted value: ', form);

		// this.httpComp.makePostRequest('/login',form).subscribe((res : Response) => {
		this.httpComp.makePostRequest(API_ENDPOINT+'/login',form).subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if('viewname' in response){
				console.log('correct user :', response.viewname);

				this.form.patchValue({
					id: '',
					password: '',
				});

				this.loginObj.setCurrentUser(response.viewname);
				this.loginObj.setCurrentCompany(response.companyName);

				// sessionStorage.setItem('currentUser', response.viewname);
				// sessionStorage.setItem('currentCompany', response.companyName);

				this.timeObj.initTimeZone();
				this.employees.initEmployee();
				this.departments.initDepartments();
				this.schedule.initSchedule();
				this.tipObj.initTip();
				
				this.router.navigate(['/']);
			}else{
				console.log('invalid user :');
				this.errorMsg.showErrorMessage('ID or Password is not correct');
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
				this.closeSystem();
			}
		});
	}

	getUserName(): string{
		return this.loginObj.getCurrentUser();
	}

	getUserCompany(): string{
		return this.loginObj.getCurrentCompany();
	}

}