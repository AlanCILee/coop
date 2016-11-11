import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Response } from "@angular/http";
import { HttpComponent } from "../../core/http.component";


@Component({
    selector: 'department',
    templateUrl: 'department.component.html',
    styleUrls: ['department.component.css']
})

export class DepartmentComponent implements OnInit {
    departments: Department[];
    form: FormGroup;
    editItem: any = null;

    constructor(private departmentsObj: Departments,
                private httpComp: HttpComponent,
                private fb: FormBuilder){
    };

    ngOnInit(){
        // this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.form = this.fb.group({
            dId: [ -1 ],
            dName: [ '' ],
            dRatio: [ '' ],
        })
    }
    
    clearInput(): void{
        this.form.patchValue({
            dId: -1,
            dName: '',
            dRatio: ''
        });
        this.editItem = null;
    }

    onSubmit(form: any): void{
        console.log('department form result: ',form);

        if( form.dId > 0){  // update case
            this.httpComp.makePostRequest('http://localhost:3000/upDepartment',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);

                if( Number(response.affectedRows) > 0){
                    console.log('update successfully :', response.changedRows );
                    this.departmentsObj.addDepartment(form.dId, form.dName, Number(form.dRatio));
                }else{
                    console.log('invalid user :');
                }
            });
        }else {             // insert case
            this.httpComp.makePostRequest('http://localhost:3000/newDepartment',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);

                if( Number(response.insertId) > 0){
                    console.log('insert successfully :', response.insertId );
                    this.departmentsObj.addDepartment(response.insertId, form.dName, Number(form.dRatio));
                }else{
                    console.log('invalid user :');
                }
            });
        }
        this.clearInput();
    }

    depBtn( dep: Department): void {
        console.log('click department: ', dep);
        this.editItem = dep;

        this.form.patchValue({
            dId: dep.departId,
            dName: dep.departName,
            dRatio: dep.departRatio
        });
    }

    deleteItem(): void {
        this.departmentsObj.removeDepartment(this.editItem);
        this.clearInput();
    }
}
