import { Injectable } from "@angular/core";

@Injectable()
export class Departments {
    department: Department[] =[];

    addDepartment(departId: number, departName: string): void{
        this.department.push(new Department( departId, departName ));
    }

    loadDepartments(departments: Object[]): void {
        departments.forEach(( depart ) => {
            this.addDepartment( depart['departId'], depart['departName']);
        });
    }

    initDepartments(){
        console.log('initDepartments Loading Departments');
        this.loadDepartments(mockDepartments);
    }

    getDepartmentName(departId: number): string{
        // console.log('getDepartmentName :'+ departId);
        let departName: string ='';

        this.department.forEach((depart) => {
            if(depart.departId == departId)
                departName = depart.departName;
        });

        return departName;
    }
}

export class Department {
    constructor(public departId: number,
                public departName: string) {
    }
}

const mockDepartments = [
    { departId: 1, departName: 'Software'},
    { departId: 2, departName: 'Sales'},
    { departId: 3, departName: 'HR'},
    { departId: 4, departName: 'QA'},
];