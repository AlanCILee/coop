import { Injectable } from "@angular/core";

@Injectable()
export class Departments {
    departments: Department[] =[];

    addDepartment(departId: number, departName: string, ratio: number): void{
        let update = false;

        console.log('addDepartment : ',departId, departName, ratio);

        this.departments.forEach((dep)=>{
            if(dep.departId == departId){
                dep.departName = departName;
                dep.departRatio = ratio;
                update = true;
            }
        });

        if(!update)
            this.departments.push(new Department( departId, departName, ratio ));
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
    
    getDepartRatio(departName: string): number{
        let departRatio: number = 0;
        
        this.departments.forEach((depart) => {
            if(depart.departName == departName)
                departRatio = depart.departRatio;
        });
        
        return departRatio;
    }
}

export class Department {
    constructor(public departId: number,
                public departName: string,
                public departRatio: number) {
    }
}

const mockDepartments = [
    { departId: 0, departName: 'Software', ratio: 10},
    { departId: 1, departName: 'Sales', ratio: 20},
    { departId: 2, departName: 'HR', ratio: 30 },
    { departId: 3, departName: 'QA', ratio: 40 },
];