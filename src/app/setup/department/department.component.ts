import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Response } from "@angular/http";
import { HttpComponent } from "../../core/http.component";
import {API_ENDPOINT} from "../../core/config";


@Component({
    selector: 'department',
    templateUrl: 'department.component.html',
    styleUrls: ['department.component.css']
})

export class DepartmentComponent implements OnInit {
    departments: Department[];
    form: FormGroup;
    editItem: Department = null;

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
    
    backDateSubmit(){
        let form:any = this.form.getRawValue();
        console.log('backDateSubmit', form);
    
        this.httpComp.makePostRequest(API_ENDPOINT+'/backDepartment',form).subscribe((res : Response) => {
            let response = res.json();
            console.log('HttpComponent : ',response);
        
            if( Number(response.affectedRows) > 0){
                console.log('update successfully :', response.insertId );
                this.departmentsObj.updateDepartment(form.dId, form.dName, Number(form.dRatio));
            }else{
                console.log('department update fail');
            }
        });
        this.clearInput();
    }
    
    onSubmit(form: any): void{
        console.log('department form result: ',form);

        if( form.dId > 0){  // update case
            this.httpComp.makePostRequest(API_ENDPOINT+'/upDepartment',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);

                if( Number(response.insertId) > 0){
                    console.log('update successfully :', response.insertId );
                    this.departmentsObj.addDepartment(form.dId, form.dName, Number(form.dRatio), false);
                    this.departmentsObj.addDepartment(response.insertId, form.dName, Number(form.dRatio), true);
                }else{
                    console.log('department update fail');
                }
            });
            this.clearInput();
        }else {             // insert case
            this.httpComp.makePostRequest(API_ENDPOINT+'/newDepartment',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);

                if( Number(response.insertId) > 0){
                    console.log('insert successfully :', response.insertId );
                    this.departmentsObj.addDepartment(response.insertId, form.dName, Number(form.dRatio), true);
                }else{
                    console.log('department insert fail');
                }
            });
            this.clearInput();
        }
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
        this.httpComp.makePostRequest(API_ENDPOINT+'/rmDepartment',{ dId: this.editItem.departId} ).subscribe((res : Response) => {
            let response = res.json();
            console.log('deleteItem : ', response);
        
            if( Number(response.affectedRows) > 0){
                this.departmentsObj.removeDepartment(this.editItem);
                console.log('delete successfully :', this.editItem );
            }else{
                console.log('department update fail');
            }
            this.clearInput();
        });
    }
    
    getDepartNumber(): number {
        let cnt: number = 0;
        
        this.departments.forEach((depart)=>{
            if(depart.valid){
                cnt++;
            }
        });
        return cnt;
    }

    checkHighlighted(dep: Department): boolean{
        if(this.editItem){
            return this.editItem.departId == dep.departId;
        }else{
            return false;
        }
    }

}
