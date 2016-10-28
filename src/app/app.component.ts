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

class Node <T> {
    data: T;
    left: Node;
    right: Node;

    constructor(_data: T){
        this.data = _data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree <T> {
    const root: Node = null;

    insert( value: T): void {
        // let newNode: Node = new Node (value);
        if( this.root == null ){
            this.root = new Node (value);
            return;
        }

        if( this.root.data.compareTo( value ) >= 0) {

        }
    }
}

interface Comparable<T> {
    compareTo(other: T): number;
}

class A implements Comparable {
    let value: number;

    compareTo(other: A): number {
        return this.value - other.value;
    }
}


