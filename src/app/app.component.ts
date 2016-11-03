import { Component, OnInit } from '@angular/core';

import '../../public/css/styles.css';
import { Employees } from "./model/employee";
import { Departments } from "./model/department";
import { TimeTable } from "./model/time";
import { Schedule } from "./model/schedule";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private employees: Employees,
                private departments: Departments,
                private schedule : Schedule,
                private timeObj: TimeTable,
                private time: TimeTable) {
        
    }
    
    ngOnInit() {
        this.employees.initEmployee();
        this.departments.initDepartments();
        this.schedule.loadSchedule();
        this.time.createTimeTable();
        this.timeObj.loadMockTimeZone();

        // let a1 = new A(1);
        // let a2 = new A(2);
        // let a3 = new A(3);
        // let a4 = new A(4);
        // let a5 = new A(5);
        // let a6 = new A(6);
        //
        // let n1 = new Node(a1);
        // let n2 = new Node(a2);
        // let n3 = new Node(a3);
        // let n4 = new Node(a4);
        // let n5 = new Node(a5);
        // let n6 = new Node(a6);
        //
        // let bst = new BinarySearchTree();
        // bst.addNode(n3, bst.root);
        // bst.addNode(n5, bst.root);
        // bst.addNode(n2, bst.root);
        // bst.addNode(n6, bst.root);
        // bst.addNode(n1, bst.root);
        // bst.addNode(n4, bst.root);
        //
        // bst.inOrderTraversal(bst.root);
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






