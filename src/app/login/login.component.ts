import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";

import { HttpComponent } from "../core/http.component";
import { Router } from "@angular/router";

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	form: FormGroup;
	viewname: string = null;

	constructor(
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
		this.httpComp.makePostRequest('http://localhost:3000/login',form).subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if('viewname' in response){
				console.log('correct user :', response.viewname);
				sessionStorage.setItem('currentUser', response.viewname);
				this.router.navigate(['/']);
			}else{
				console.log('invalid user :');
				this.router.navigate(['/']);
			}
		});
	}

	logout(): void{
		// this.httpComp.makeRequest('/logout').subscribe((res : Response) => {
		this.httpComp.makeRequest('http://localhost:3000/logout').subscribe((res : Response) => {
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