import { Component, OnInit } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { Job, Schedule } from "../../model/schedule";
import { FormBuilder, FormGroup } from "@angular/forms";
import {TipModel} from "../../model/tip";
import {TimeTable} from "../../model/time";
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.css']
})

export class ReviewComponent implements OnInit {
    employees: Employee[];
    departments: Department[];
    editDate: string;
    form : FormGroup;
    editItem: any = null;
    sJobs: Job[] = [];
    LIST_DATE: number = 7;
    timeZones: Object =[];

    constructor(private employeesObj: Employees,
                private departmentsObj: Departments,
                private scheduleObj: Schedule,
                private fb: FormBuilder,
                private timeObj: TimeTable,
                private tipObj: TipModel,
    ){ }

    ngOnInit(){
        this.employees = this.employeesObj.employees;
        this.departments = this.departmentsObj.departments;
        this.timeZones = this.timeObj.timeZones;

        this.form = this.fb.group({
            date: [ '' ],
        });


    }

    dateChanged(str: string){
        // let departJobs: any[][] =[];
        // let departName: string[] = [];
        console.log('dateChanged');
        this.editDate = str;
        this.sJobs = this.scheduleObj.getJobs(str, this.LIST_DATE);
        this.show();
    }

    show(): void {
        let jobsDates: any[] = [];
        let jobsPeople: any[] = [];
        console.log("show():", this.timeZones);

        this.sJobs.forEach(( job ) => {

            if(!(job.date in jobsDates))
                jobsDates[job.date] = [];

            if(!(job.departName in jobsDates[job.date]))
                jobsDates[job.date][job.departName] = [];

            if(!(job.empName in jobsDates[job.date][job.departName])){
                jobsDates[job.date][job.departName][job.empName] = [];
                jobsDates[job.date][job.departName][job.empName]['hours']
                    = this.calcurateHours(0, 0);
            }

            if(!(job.empName in jobsPeople))
                jobsPeople[job.empName] = [];

            if(!(job.date in jobsPeople[job.empName]))
                jobsPeople[job.empName][job.date] = [];

            if(!(job.departName in jobsPeople[job.empName][job.date])){
                jobsPeople[job.empName][job.date][job.departName] = [];
                jobsPeople[job.empName][job.date][job.departName]['hours']
                    = this.calcurateHours(0, 0);
            }

            let hoursResult = jobsPeople[job.empName][job.date][job.departName]['hours'];
            for(let key in hoursResult){
                let newHours = this.calcurateHours(job.startN, job.endN);
                hoursResult[key] += newHours[key];
            }

            jobsDates[job.date][job.departName][job.empName]['hours'] = hoursResult;
            jobsPeople[job.empName][job.date][job.departName]['hours'] = hoursResult;

        });

        console.log('jobsDates: ', jobsDates);
        console.log('jobsPeople: ', jobsPeople);


    }

    calcurateHours(startN: number, endN: number): Object{
        console.log('calcurateHours: start: ', startN, 'end: ', endN);
        let hourObj: Object = {};

        for( var zone in this.timeZones){
            let zst = this.timeZones[zone].startT.timeNum;
            let zet = this.timeZones[zone].endT.timeNum;
            console.log('zone: start: ', zst, 'end: ', zet);

            let calS: number, calE: number, calR: number;

            if(startN < zst){
                calS = zst;
            }else{
                calS = startN;
            }
            if(endN > zet){
                calE = zet;
            }else{
                calE = endN;
            }
            calR = calE - calS;

            if(calR > 0)
                hourObj[zone] = calE - calS;
            else
                hourObj[zone] = 0;

        }
        console.log('hourObj: ', hourObj);
        return hourObj;
    }


            // console.log('Add job date:', job.date, 'Add job: ',job);
        // });

        // console.log('aligh job by date: ', jobsDates);
        //
        // for (var key in jobsDates ){
        //     let jobs: Job[] = jobsDates[key];
        //
        //     console.log('jobsDates[key] :', jobs);
        //     this.departJobs = [];
        //
        //     this.departmentsObj.departments.forEach((department)=> {
        //
        //         departJob = jobs.filter((job)=>{
        //             return job.departName == department.departName;
        //         });
        //
        //         if(departJob.length > 0) {
        //             this.departJobs[department.departName] = [];
        //             this.jobsDatesDeparts[key][department.departName] = [];
        //
        //             this.departJobs[department.departName] =  departJob;
        //             this.jobsDatesDeparts[key][department.departName] = departJob;
        //             console.log('key: ',key, 'departJobs of ', department.departName, 'is ',this.departJobs[department.departName]);
        //
        //             this.departments.push(department.departName);
        //             this.departCnt++;
        //             this.dispEmpNum += this.getEmpNum(departJob);
        //         }
        //     });
        //
        //     jobsDates[key] = [];
        //
        //     console.log('align0 job by date & department: ', jobsDates);
        //     console.log('align0 job by date & department: ', this.departJobs);
        // }
    // }
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
    // onSubmit(form: any): void {
    //     console.log('you submitted value: ', form);
    //     this.employeesObj.addEmployee(form.eId,
    //         form.name, form.department, form.phone, form.wage);
    //     this.clearInput();
    // }
    //
    // empBtn(emp: Employee): void {
    //     console.log('click Employee ID: ', emp);
    //     this.form.patchValue({
    //         eId: emp.empId,
    //         name: emp.empName,
    //         department: emp.departId,
    //         phone: emp.empPhone,
    //         wage: emp.wages.wage
    //     });
    //     this.editItem = emp;
    // }
    //
    // deleteItem(): void {
    //     this.employeesObj.removeEmployee(this.editItem);
    //     this.clearInput();
    // }
}
