import { Injectable } from "@angular/core";

@Injectable()
export class Departments {
    departments: Department[] =[];

    addDepartment(departId: number, departName: string, ratio: number): void{
        console.log('addDepartment : ',departId, departName, ratio);
        if(departId < 0)
            this.departments.push(new Department( this.departments.length, departName, ratio ));
        else{
            this.departments.forEach((dep)=>{
                if(dep.departId == departId){
                    dep.departName = departName;
                    dep.departRatio = ratio;
                }
            });
        }
    }

    removeDepartment(depart: Department): void{
        console.log('removeDepartment : ', depart);
        let index = this.departments.indexOf(depart);
        this.departments.splice( index, 1 );
    }

    loadDepartments(departments: Object[]): void {
        departments.forEach(( depart ) => {
            this.addDepartment( depart['departId'], depart['departName'], depart['ratio']);
        });
    }

    initDepartments(){
        console.log('initDepartments Loading Departments');
        this.loadDepartments(mockDepartments);
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
}

export class Department {
    constructor(public departId: number,
                public departName: string,
                public departRatio: number) {
    }
}

const mockDepartments = [
    { departId: -1, departName: 'Software', ratio: 10},
    { departId: -1, departName: 'Sales', ratio: 20},
    { departId: -1, departName: 'HR', ratio: 30 },
    { departId: -1, departName: 'QA', ratio: 40 },
];