import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Http, Response} from "@angular/http";

import '../../public/css/styles.css';
import { Employees } from "./model/employee";
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";
import { Schedule } from "./model/schedule";
import { TipModel } from "./model/tip";
import { HttpComponent } from "./core/http.component";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    form: FormGroup;
    viewname: string = null;

    constructor(private employees: Employees,
                private departments: Departments,
                private schedule : Schedule,
                private timeObj: TimeTable,
                private tipObj: TipModel,
                private time: TimeTable,
                private fb: FormBuilder,
                private httpComp: HttpComponent,
    ) {
        
    }
    
    ngOnInit() {
        this.employees.initEmployee();
        this.departments.initDepartments();
        this.schedule.loadSchedule();
        this.time.createTimeTable();
        this.timeObj.loadMockTimeZone();
        this.tipObj.loadMockTips();
        this.form = this.fb.group({
            id: [ '' ],
            password: [ '' ],
        });
    }

    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
        // this.httpComp.makeRequest('/login').subscribe((res : Response) => {
        //         // this.data = res.json();
        //         // this.loading = false;
        //         console.log('HttpComponent : ',res);
        //     });
        console.log(form);
        // let body = `id=${form.id}&password=${form.password}`;
        // this.httpComp.makePostRequest('/login',body).subscribe((res : Response) => {
        this.httpComp.makePostRequest('/login',form).subscribe((res : Response) => {
                // this.data = res.json();
                // this.loading = false;
                let response = res.json();
                console.log('HttpComponent : ',response);
                // console.log('response[0].id : ',response[0].id);
                // console.log('response[0].password : ',response[0].password);

                if(response.viewname){
                    console.log('correct user');
                    this.viewname = response.viewname;
                    localStorage.setItem('currentUser', this.viewname);
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
            }
        });

        this.form.patchValue({
            id : '',
            password : '',
        });
    }
}

// class Node<T extends Comparable<T>> {
//     value: T;
//     left: Node<T>;
//     right: Node<T>;
//
//     constructor(_obj: T){
//         this.value = _obj;
//         this.left = null;
//         this.right = null;
//     }
//
//     toString(): void {
//         console.log(this.value);
//     }
// }
//
// class BinarySearchTree<T extends Comparable<T>>{
//     root: Node<T> = null;
//
//     addNode <T extends Comparable<T>> ( _node: Node<T>, _startNode: Node<T>): void {
//
//         if( this.root == null ){
//             this.root = _node;
//             return;
//         }
//
//         if( _node.value.compareTo( _startNode.value ) <= 0) {
//             if( _startNode.left == null){
//                 _startNode.left = _node;
//             }else{
//                 this.addNode (_node, _startNode.left);
//             }
//         }else {
//             if( _startNode.right == null){
//                 _startNode.right = _node;
//             }else{
//                 this.addNode (_node, _startNode.right );
//             }
//         }
//     }
//
//     inOrderTraversal<T extends Comparable<T>> (_node: Node<T>){
//         if(_node.left != null)
//             this.inOrderTraversal( _node.left );
//
//         _node.toString();
//
//         if(_node.right != null)
//             this.inOrderTraversal( _node.right );
//     }
// }
//
// interface Comparable<T> {
//     compareTo(other: T): number;
// }
//
// class A implements Comparable<A> {
//     value: number;
//
//     constructor(_in: number){
//         this.value = _in;
//     }
//
//     compareTo(other: A): number {
//         return this.value - other.value;
//     }
// }






