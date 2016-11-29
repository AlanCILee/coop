import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpComponent } from "./http.component";
import { API_ENDPOINT } from "./config";
import { Response } from "@angular/http";
import { Observable, Subject } from "rxjs";
import { LoginComponent } from "../login/login.component";
import { LogIn } from "../model/login";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router,
	            private loginComp: LoginComponent,
	            private loginObj: LogIn,
	            private httpComp: HttpComponent) { }

	canActivate(): Observable<boolean> | boolean {
		var subject = new Subject<boolean>();

		this.httpComp.makeRequest(API_ENDPOINT+'/loginCheck').subscribe((res : Response) => {
			let response = res.json();
			if(response.viewname && response.companyName
				&& response.viewname == this.loginObj.getCurrentUser()
				&& response.companyName == this.loginObj.getCurrentCompany()){
				console.log('same user: ',response);
				subject.next(true);
			}else{
				console.log('Diff user: ',response);
				this.loginComp.closeSystem();
				subject.next(false);
			}
		});
		return subject.asObservable().first();
	}
}
