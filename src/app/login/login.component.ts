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

		this.httpComp.makePostRequest('/login',form).subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if(response.viewname){
				console.log('correct user');
				this.viewname = response.viewname;
				localStorage.setItem('currentUser', this.viewname);
				this.router.navigate(['']);
			}
		});
	}

	logout(): void{
		this.httpComp.makeRequest('/logout').subscribe((res : Response) => {
			let response = res.json();
			console.log('HttpComponent : ',response);

			if(!response.viewname){
				console.log('user ', this.viewname, 'logout');
				this.viewname = null;
				localStorage.removeItem('currentUser');
				this.router.navigate(['/login']);
			}
		});

		this.form.patchValue({
			id : '',
			password : '',
		});
	}
}