export class Departments {
    department: Department[];

    addDepartment(departId: number, departName: string): void{
        this.department.push(new Department( departId,departName ));
    }
}

export class Department {
    constructor(public departId: number,
                departName: string) {
    }
}

