import { Injectable } from "@angular/core";
import { HttpComponent } from "../core/http.component";
import { Response } from "@angular/http";
import {API_ENDPOINT} from "../core/config";

@Injectable()
export class Departments {
    departments: Department[] =[];

    constructor(
        private httpComp: HttpComponent,){}

    addDepartment(departId: number, departName: string, ratio: number, valid: boolean): void{
        if(valid){
            this.departments.push(new Department( departId, departName, ratio, true ));
        }else{
            this.departments.forEach((dep)=>{
                if(dep.departId == departId){
                    dep.valid = false;
                }
            });
        }
        console.log('addDepartment : ', this.departments);
    }

    removeDepartment(depart: Department): void{
        this.departments.forEach((dep)=>{
            if(dep.departId == depart.departId){
                dep.valid = false;
            }
        });
        console.log('removeDepartment result: ', this.departments);
    }

    loadDepartments(departments: Object[]): void {
        departments.forEach(( depart ) => {
            this.addDepartment( depart['departId'], depart['departName'], depart['ratio'], true);
        });
    }

    initDepartments(){
        console.log('initDepartments Loading Departments');
        // this.loadDepartments(mockDepartments);

        this.httpComp.makeRequest(API_ENDPOINT+'/getDepartment').subscribe((res : Response) => {
            let response = res.json();

            if ( response.err ) {
                console.log('loadDepartments Fail :');
            }else{
                console.log('loadDepartments from DB :', response);
                response.forEach((depart: any)=>{
                    this.departments.push(new Department(depart.departId, depart.departName, depart.departRatio, depart.valid ));
                });
            }
        });
    }

    getDepartmentName(departId: number): string{
        // console.log('getDepartmentName :'+ departId);
        let departName: string ='';

        this.departments.forEach((depart) => {
            if(depart.departId == departId)
                departName = depart.departName;
        });

        return departName;
    }
    //
    // getDepartRatio(departName: string): number{
    //     let departRatio: number = 0;
    //
    //     this.departments.forEach((depart) => {
    //         if(depart.departName == departName)
    //             departRatio = depart.departRatio;
    //     });
    //
    //     return departRatio;
    // }
    
    getDepartRatio(departId: number): number{
        let departRatio: number = 0;
        
        this.departments.forEach((depart) => {
            if(depart.departId == departId)
                departRatio = depart.departRatio;
        });
        
        return departRatio;
    }
}

export class Department {
    constructor(public departId: number,
                public departName: string,
                public departRatio: number,
                public valid: boolean) {
    }
}
//
// const mockDepartments = [
//     { departId: 0, departName: 'Software', ratio: 10},
//     { departId: 1, departName: 'Sales', ratio: 20},
//     { departId: 2, departName: 'HR', ratio: 30 },
//     { departId: 3, departName: 'QA', ratio: 40 },
// ];