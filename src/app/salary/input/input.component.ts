import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule, AbstractControl} from '@angular/forms';

import { Employees, Employee } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { TimeTable } from "../../model/time";
import { TipModel } from "../../model/tip";


@Component({
    selector: 'enter',
    templateUrl: 'input.component.html',
    styleUrls: ['input.component.css']
})

export class InputComponent implements OnInit {
    employees: Employee[];
    departments: Department[];
    timeZones: Object = [];
    form : FormGroup;
    dailyT: Object;
    // editItem: any = null;
    //
    constructor(private employeesObj: Employees,
            private departmentsObj: Departments,
            private timeObj: TimeTable,
            private tipObj: TipModel,
            private fb: FormBuilder){
    };

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.timeZones = this.timeObj.timeZones;
        this.tipObj.loadMockTips();
        this.dailyT = this.tipObj.dailyT;
        // let control = new FormControl({value: '', disabled: false});

        this.form = this.fb.group({
            date: [ '' ],
            // Morning: [ '' ],
            // Afternoon: [ '' ],
        });

        console.log('inputComponent ngOninit: ', this.timeZones);
        // var control = new AbstractControl(null, null);

        for(var key in this.timeZones){
            // let control = new FormControl({value: '', });
            // this.form.addControl( key, control);
            this.form.addControl( key, this.fb.control(['', ]));
        }

        // control['date'] = ['', ];
        // this.form.addControl( 'date', this.fb.control(control));
        // for(var key in this.timeZones){
        //
        //     control[key] = ['', ];
        //     this.form.addControl( key, this.fb.control(control));
        // }
        // this.form = this.fb.group({
        //     date: [ '' ],
        //     // name: [ '' ],
        //     // department: [ '' ],
        //     // phone: [ '' ],
        //     // wage: [ '' ],
        // })
    }

    dateChanged(str: string){
        // let departJobs: any[][] =[];
        // let departName: string[] = [];
        // this.editDate = str;
        // console.log('got message from Calendar: ' + str);
        // this.sJobs = this.dScheduleObj.getJobs(str, this.LIST_DATE);
        // console.log('ngOnInit() jobs:', this.sJobs);

    }
    //
    // getDepartName(departId: number){
    //     return this.departmentsObj.getDepartmentName(departId);
    // }
    //
    // clearInput(): void{
    //     this.form.patchValue({
    //         eId: -1,
    //         name: '',
    //         department: '',
    //         phone: '',
    //         wage: ''
    //     });
    //     this.editItem = null;
    // }
    //
    onSubmit(form: any): void {
        console.log('you submitted value: ', form);
        // this.employeesObj.addEmployee(form.eId,
        //     form.name, form.department, form.phone, form.wage);
        // this.clearInput();
    }
    //
    tipBtn(tip: Object): void {
        console.log('click Tip : ', tip);
        // this.form.patchValue({
        //     eId: emp.empId,
        //     name: emp.empName,
        //     department: emp.departId,
        //     phone: emp.empPhone,
        //     wage: emp.wages.wage
        // });
        // this.editItem = emp;
    }
    //
    // deleteItem(): void {
    //     this.employeesObj.removeEmployee(this.editItem);
    //     this.clearInput();
    // }
}
