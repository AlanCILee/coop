import { Component, OnInit } from "@angular/core";
import { Response } from "@angular/http";
import { HttpComponent } from "../core/http.component";
import {LoginComponent} from "../login/login.component";

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


	constructor(private httpComp: HttpComponent,
	            private loginComp: LoginComponent,
				) {
	}

	ngOnInit() {
	}
	//
	// getUserName(): string{
	// 	if(localStorage.getItem('currentUser'))
	// 		return localStorage.getItem('currentUser');
	// }
	//
	// logout(): void{
	// 	this.loginComp.logout();
	//     // this.httpComp.makeRequest('http://localhost:3000/logout').subscribe((res : Response) => {
	//     //     let response = res.json();
	//     //     console.log('HttpComponent : ',response);
	//     //
	//     //     if(!response.viewname){
	//     //         console.log('user ', this.getUserName(), 'logout');
	//     //         localStorage.removeItem('currentUser');
	//     //     }
	//     // });
	//
	// }
}
