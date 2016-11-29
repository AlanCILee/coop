import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Http, Response} from "@angular/http";

// import '../../public/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/css/styles.css';
import { Employees } from "./model/employee";
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";
import { Schedule } from "./model/schedule";
import { TipModel } from "./model/tip";
import { HttpComponent } from "./core/http.component";
import { Router } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { LogIn } from "./model/login";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    form: FormGroup;
    initialize: boolean = false;
    viewname: string = null;

    constructor(
                private loginObj: LogIn,
    ) {
    }
    
    ngOnInit() {
        console.log("App component ngOnInit ===================================");
    }

    getUserName(): string{
        // console.log("getUserName: +++++", this.loginObj.getCurrentUser());
        return this.loginObj.getCurrentUser();
    }

}







