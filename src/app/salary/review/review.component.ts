import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { Job, Schedule } from "../../model/schedule";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TipModel } from "../../model/tip";
import { TimeTable } from "../../model/time";

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
    // LIST_DATE: number = 7;
    timeZones: Object =[];
    jobsDates: any = {};
    jobsPeople: any = {};
    dailyHours: any = {};
    dailyT : Object = {};
    // tableContents: string = "";
    
    LIST_DATE: number = 0;
    LIST_VIEW: string[] = [
        'Today',
        'This Week',
        'This Two Weeks',
        'This Month',
        'A Week from Today',
        'Two Weeks from Today',
        'One Month from Today',
    ];
    
    
    
    @ViewChild('tableData') tableData: ElementRef;
    @ViewChild('summary') summary: ElementRef;

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
        // this.timeZones = this.timeObj.timeZones;
        this.timeZones = this.timeObj.timeZonesHistory;
        this.dailyT = this.tipObj.dailyT;
        this.form = this.fb.group({
            date: [ '' ],
        });
    }

    dateChanged(str: string){
        // let departJobs: any[][] =[];
        // let departName: string[] = [];
        console.log('dateChanged');
        this.editDate = str;
        // this.sJobs = this.scheduleObj.getJobs(str, this.LIST_DATE);
        this.scheduleObj.getJobs(str, Number(this.LIST_DATE),(list: Job[])=>{
            this.sJobs = list;
            console.log('ngOnInit() jobs:', this.sJobs);
            this.show();
        });
    }

    show(): void {
        // let hoursResult = this.calculateHours(0, 0);

        console.log("show():", this.timeZones);

        this.sJobs.forEach(( job ) => {

            if(!(job.date in this.jobsDates)){
                this.jobsDates[job.date] = {};
                this.dailyHours[job.date] = {};
            }

            if(!(job.departId in this.jobsDates[job.date])){
                this.jobsDates[job.date][job.departId] = {};
                
                this.dailyHours[job.date][job.departId] = {};
                this.dailyHours[job.date][job.departId]['tip'] = {};
                this.dailyHours[job.date][job.departId]['hour']
                    = this.calculateHours(0, 0);
            }

            if(!(job.empId in this.jobsDates[job.date][job.departId])){
                this.jobsDates[job.date][job.departId][job.empId] = {};
                // this.jobsDates[job.date][job.departId][job.empId]['name'] = job.empName;
                this.jobsDates[job.date][job.departId][job.empId]['name']
                    = this.employeesObj.getEmployeeName(job.empId);

                this.jobsDates[job.date][job.departId][job.empId]['tip'] = {};
                this.jobsDates[job.date][job.departId][job.empId]['wage'] = {};
                this.jobsDates[job.date][job.departId][job.empId]['hour']
                    = this.calculateHours(0, 0);
            }

            if(!(job.empId in this.jobsPeople))
                this.jobsPeople[job.empId] = {};

            if(!(job.date in this.jobsPeople[job.empId]))
                this.jobsPeople[job.empId][job.date] = {};

            if(!(job.departId in this.jobsPeople[job.empId][job.date])){
                this.jobsPeople[job.empId][job.date][job.departId] = {};
                // this.jobsPeople[job.empId][job.date][job.departId]['name'] = job.empName;
                this.jobsPeople[job.empId][job.date][job.departId]['name']
                    = this.employeesObj.getEmployeeName(job.empId);

                this.jobsPeople[job.empId][job.date][job.departId]['tip'] = {};
                this.jobsPeople[job.empId][job.date][job.departId]['wage'] = {};
                this.jobsPeople[job.empId][job.date][job.departId]['hour']
                    = this.calculateHours(0, 0);
            }

            let empHours = this.jobsDates[job.date][job.departId][job.empId]['hour'];
            let depHours = this.dailyHours[job.date][job.departId]['hour'];
            
            // console.log(job.date, job.departId, job.empName);
            console.log('hourResult', empHours);
           
            Object.keys(empHours).forEach((zone)=>{
                let newHours = this.calculateHours(job.startN, job.endN);
                empHours[zone] += newHours[zone];
                depHours[zone] += newHours[zone];
            });

            this.jobsDates[job.date][job.departId][job.empId]['hour'] = empHours;
            this.jobsPeople[job.empId][job.date][job.departId]['hour'] = empHours;
            this.dailyHours[job.date][job.departId]['hour'] = depHours;
        });

        this.calculateDepartTips();
        this.calculateEmpTipsAndWages();
        this.createDispFormat();
        
        console.log('jobsDates: ', this.jobsDates);
        console.log('jobsPeople: ', this.jobsPeople);
        console.log('dailyHours: ', this.dailyHours);
    }

    createDispFormat(): void{
        let table: string =``;
        let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'});
        let periodTip = 0;
        let periodHour = 0;
        let periodWage = 0;

        Object.keys(this.jobsDates).forEach((date) => {
            table += `<table border="1">`;
            table += `<tr><td>${date}</td></tr>`;
            table += `<tr><td>Department</td>
                        <td>Name</td>
                        <td>Category</td>`;
            // Object.keys(this.timeZones).forEach((zone) => {
            Object.keys(this.timeZones).forEach((zoneId) => {
                table += `<td>${ this.timeZones[zoneId].zoneName }</td>`;
            });
            table += `<td>Sum</td></tr>`;

            let dailyTip = 0;
            let dailyHour = 0;
            let dailyWage = 0;

            Object.keys(this.jobsDates[date]).forEach((depart) => {

                Object.keys(this.jobsDates[date][depart]).forEach((emp) => {
                    let employee = this.jobsDates[date][depart][emp];

                    table += `<tr><td>${this.departmentsObj.getDepartmentName(Number(depart))}</td>
                                <td>${employee['name']}</td>`;
                    table += `<td>Hour</td>`;

                    let sum: number = 0;
                    Object.keys(employee['hour']).forEach((zone) => {
                        sum += employee['hour'][zone];
                        table += `<td>${ employee['hour'][zone]}</td>`;
                    });
                    table += `<td>${sum}</td>`;
                    table += `</tr>`;
                    dailyHour += sum;

                    table += `<tr><td></td><td></td>`;
                    table += `<td>Tip</td>`;
                    sum = 0;
                    Object.keys(employee['tip']).forEach((zone) => {
                        sum += employee['tip'][zone];
                        table += `<td>${ currency.format(employee['tip'][zone]) }</td>`;
                    });
                    table += `<td>${ currency.format(sum) }</td>`;
                    table += `</tr>`;
                    dailyTip += sum;
                    
                    table += `<tr><td></td><td></td>`;
                    table += `<td>Wage</td>`;
                    sum = 0;
                    Object.keys(employee['wage']).forEach((zone) => {
                        sum += employee['wage'][zone];
                        table += `<td>${ currency.format(employee['wage'][zone]) }</td>`;
                    });
                    table += `<td>${ currency.format(sum) }</td>`;
                    table += `</tr>`;
                    dailyWage += sum;
                });
            });
            table += `</table>`;
            table += `<p>Daily Total, Hour: ${dailyHour}
                    , Tip: ${ currency.format(dailyTip) }
                    , Wage: ${ currency.format(dailyWage) }</p>`;

            periodHour += dailyHour;
            periodTip += dailyTip;
            periodWage += dailyWage;
        });

        this.tableData.nativeElement.innerHTML = table;
        this.summary.nativeElement.innerHTML = `<p>Period Total, Hour: ${periodHour}
                    , Tip: ${ currency.format(periodTip) }
                    , Wage: ${ currency.format(periodWage) }</p>`;
    }

    calculateEmpTipsAndWages(): void{
        Object.keys(this.jobsDates).forEach((date)=>{
            
            Object.keys(this.jobsDates[date]).forEach((depart)=>{
                let departTime = this.dailyHours[date][depart]['hour'];
                let departTip = this.dailyHours[date][depart]['tip'];
                
                Object.keys(this.jobsDates[date][depart]).forEach((empId)=>{
                    
                    Object.keys(departTip).forEach((zone)=>{
                        if(departTime[zone] !=0 ) {
                            this.jobsDates[date][depart][empId]['tip'][zone]
                                = this.jobsDates[date][depart][empId]['hour'][zone] *
                                    departTip[zone] / departTime[zone];
                        }else{
                            this.jobsDates[date][depart][empId]['tip'][zone] = 0;
                        }

                        this.jobsDates[date][depart][empId]['wage'][zone]
                            = this.jobsDates[date][depart][empId]['hour'][zone] *
                                this.employeesObj.getEmployee(Number(empId)).getCurrentWage(date).wage
                                / 60;

                        console.log('empId: ',empId, 'date:',date, 'wage: ',
                            this.employeesObj.getEmployee(Number(empId)).getCurrentWage(date));//.wage);
                    });
                });
            });
        });
    }
    
    calculateDepartTips():void{
        Object.keys(this.jobsDates).forEach((date) => {
            let dayTipAmount = this.dailyT[date];
            let totalRatio: number = 0;
            let departRatio = {};

            Object.keys(this.jobsDates[date]).forEach((depart)=>{
                departRatio[depart] = this.departmentsObj.getDepartRatio(Number(depart));
                totalRatio += departRatio[depart];
            });
            
            Object.keys(this.jobsDates[date]).forEach((depart)=>{
                Object.keys(dayTipAmount).forEach((zone) => {
                    this.dailyHours[date][depart]['tip'][zone] = dayTipAmount[zone] * departRatio[depart] / totalRatio;
                });
            });
        });
        console.log('calculateDepartTips :',this.dailyHours);
    }
    
    calculateHours(startN: number, endN: number): Object{
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

    getNameofEmp(id: number): string{
        return this.employeesObj.getEmployeeName(id);
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
