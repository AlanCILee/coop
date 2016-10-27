import { Component, OnInit } from '@angular/core';

import '../../public/css/styles.css';
import { Employees } from "./model/employee";
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor( private employees: Employees,
            private departments: Departments,
            private time: TimeTable){

    }

    ngOnInit (){
        this.employees.initEmployee();
        this.departments.initDepartments();
        this.time.createTimeTable();
    }
}
