import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Employees, Employee, Wage } from "../../model/employee";
import { Department, Departments } from "../../model/department";
import { Job, Schedule } from "../../model/schedule";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TipModel } from "../../model/tip";
import { TimeTable } from "../../model/time";
import { Router } from '@angular/router';
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

    timeZones: Object =[];
    jobsDates: any = {};
    jobsPeople: any = {};
    dailyHours: any = {};
    dailyT : Object = {};

    LIST_DATE: number = 0;
    LIST_VIEW: string[] = [
        'One Day',
        'One Week',
        'Two Weeks',
        'One Month',
        'A Week from the Day',
        'Two Weeks from the Day',
        'A Month from the Day',
    ];
    
    LIST_OPTION_VALUE: number = 0;
    LIST_OPTION: string[] = [
        'Employee Detail',
        'Date Detail',
        'Employee Simple',
        'Date Simple'
    ];
    
    @ViewChild('tableData') tableData: ElementRef;
    // @ViewChild('tableData2') tableData2: ElementRef;
    // @ViewChild('summary') summary: ElementRef;

    constructor(private employeesObj: Employees,
                private departmentsObj: Departments,
                private scheduleObj: Schedule,
                private fb: FormBuilder,
                private router: Router,
                private timeObj: TimeTable,
                private tipObj: TipModel,
    ){ }

    ngOnInit(){
        if(this.scheduleObj.initialize){
            this.employees = this.employeesObj.employees;
            this.departments = this.departmentsObj.departments;
            // this.timeZones = this.timeObj.timeZones;
            this.timeZones = this.timeObj.timeZonesHistory;
            this.dailyT = this.tipObj.dailyT;
        }else{
            this.router.navigate(['/home']);
        }
        this.form = this.fb.group({
            date: [ '' ],
            fix: [' '],
        });
    }

    dateChanged(str: string){
        console.log('dateChanged: ',str);
        this.editDate = str;
        this.scheduleObj.getJobs(str, Number(this.LIST_DATE),(list: Job[])=>{
            this.sJobs = list;
            console.log('dateChanged jobs:', this.sJobs);
            this.generateData();
            this.showResult(this.LIST_OPTION_VALUE);
        });
    }
    
    onChangePeriod(dateOption: number) {
        console.log(dateOption);
        this.LIST_DATE = dateOption;
        this.scheduleObj.getJobs(this.editDate, Number(this.LIST_DATE),(list: Job[])=>{
            this.sJobs = list;
            console.log('onChange jobs:', this.sJobs);
            this.generateData();
            this.showResult(this.LIST_OPTION_VALUE);
        });
    }
    
    onChangeViewOption(viewOption: number){
        console.log('onChangeViewOption: ', viewOption);
        this.LIST_OPTION_VALUE = Number(viewOption);
        this.showResult(this.LIST_OPTION_VALUE);
    }
    
    showResult(viewOption: number){
        let table: string = '';
        switch (viewOption){
            case 0:
            case 2:
                table = this.employeeDetail(viewOption);
                break;
        
            case 1:
            case 3:
                table = this.dateDetail(viewOption);
                break;
        
            default:
                break;
        }
        this.tableData.nativeElement.innerHTML = table;
    }
    
    generateData(): void {
        console.log("generateData: ", this.timeZones);
        this.jobsDates = {};
        this.dailyHours = {};
        this.jobsPeople = {};
        
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

            console.log('hourResult', empHours);
           
            Object.keys(empHours).forEach((zone)=>{
                let newHours = this.calculateHours(job.startN, job.endN);
                empHours[zone] += newHours[zone];
                depHours[zone] += newHours[zone] * (this.employeesObj.getEmployeeRatio(job.empId) / 100);
            });

            this.jobsDates[job.date][job.departId][job.empId]['hour'] = empHours;
            this.jobsPeople[job.empId][job.date][job.departId]['hour'] = empHours;
            this.dailyHours[job.date][job.departId]['hour'] = depHours;
        });

        this.calculateDepartTips();
        this.calculateEmpTipsAndWages();
        // this.createDispFormat();
        
        console.log('jobsDates: ', this.jobsDates);
        console.log('jobsPeople: ', this.jobsPeople);
        console.log('dailyHours: ', this.dailyHours);
    }

    dateDetail(viewOption: number): string{
        console.log('date detail table create');
        let table: string =``;
        let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'});
        let periodTip = 0;
        let periodHour = 0;
        let periodWage = 0;
    
        Object.keys(this.jobsDates).forEach((date) => {
            table += `<div class="table-responsive"><table class ="table table-hover">`;
            table += `<thead><tr><th>${date}</th><th></th><th></th><th></th><th></th><th></th><th></th></tr>`;

            if(viewOption == 1){
                table += `<tr><th>Department</th>
                            <th>Name</th>
                            <th>Category</th>`;
                Object.keys(this.timeZones).forEach((zoneId) => {
                    table += `<th>${ this.timeZones[zoneId].zoneName }</th>`;
                });
                table += `<th>Sum</th></tr></thead><tbody>`;
            }else{
                table += `</tr></thead>`;
            }

            let dailyTip = 0;
            let dailyHour = 0;
            let dailyWage = 0;
            let detailString: string = '';

            Object.keys(this.jobsDates[date]).forEach((depart) => {
            
                Object.keys(this.jobsDates[date][depart]).forEach((emp) => {
                    let employee = this.jobsDates[date][depart][emp];

                    detailString += `<tr><td>${this.departmentsObj.getDepartmentName(Number(depart))}</td>
                                <td>${employee['name']}</td>`;
                    detailString += `<td>Hour</td>`;
                
                    let sum: number = 0;
                    Object.keys(employee['hour']).forEach((zone) => {
                        sum += employee['hour'][zone];
                        // detailString += `<!--<td>${ employee['hour'][zone] }</td>-->`;
                        detailString += `<td>${ employee['hour'][zone]/60 }</td>`;
                    });
                    detailString += `<td>${sum /60}</td>`;
                    detailString += `</tr>`;
                    dailyHour += sum;

                    detailString += `<tr><td></td><td></td>`;
                    detailString += `<td>Tip</td>`;
                    sum = 0;
                    Object.keys(employee['tip']).forEach((zone) => {
                        sum += employee['tip'][zone];
                        detailString += `<td>${ currency.format(employee['tip'][zone]) }</td>`;
                    });
                    detailString += `<td class="active">${ currency.format(sum) }</td>`;
                    detailString += `</tr>`;
                    dailyTip += sum;

                    detailString += `<tr><td></td><td></td>`;
                    detailString += `<td>Wage</td>`;
                    sum = 0;
                    Object.keys(employee['wage']).forEach((zone) => {
                        sum += employee['wage'][zone];
                        detailString += `<td>${ currency.format(employee['wage'][zone]) }</td>`;
                    });
                    detailString += `<td class="active">${ currency.format(sum) }</td>`;
                    detailString += `</tr>`;
                    dailyWage += sum;
                });
            });
        
            periodHour += dailyHour;
            periodTip += dailyTip;
            periodWage += dailyWage;
        
            // table += `</tbody></table></div>`;
            if(viewOption == 1){
                table += detailString;
                table += `</tbody>`;
            }

            table += `<tfoot><tr><th>Daily Total</th><th></th><th></th><th></th><th>Hour</th><th>Tip</th><th>Wage</th></tr>`;
            table += `<tr><td></td><td></td><td></td><td></td><td>${ dailyHour/60 }</td><td>${ currency.format(dailyTip)}</td><td>${ currency.format(dailyWage) }</td></tr></tfoot>`;
            table += `</table></div>`;
        });
        return table;
    }
    
    employeeDetail(viewOption: number): string {
        console.log('employee detail table create');
        let table: string =``;
        let currency = new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'});
        
        if(Object.keys(this.jobsPeople).length > 0){
            table += `<div class="table-responsive"><table class ="table table-hover">`;
            table += `<thead><tr><th>Name</th>
                        <th>Date</th>
                        <th>Department</th>
                        <th>Category</th>`;
            Object.keys(this.timeZones).forEach((zoneId) => {
                table += `<th>${ this.timeZones[zoneId].zoneName }</th>`;
            });
            table += `<th>Sum</th></thead></tr>`;
        }
    
        Object.keys(this.jobsPeople).forEach((id) => {
            // Object.keys(this.timeZones).forEach((zone) => {
            let firstPerson = true;
            let dailyTip: Object = {};
            let dailyHour: Object = {};
            let dailyWage: Object = {};
        
            Object.keys(this.timeZones).forEach((zoneId) => {
                dailyTip[zoneId] = 0;
                dailyHour[zoneId] = 0;
                dailyWage[zoneId] = 0;
            });
            dailyTip['sum'] = 0;
            dailyHour['sum'] = 0;
            dailyWage['sum'] = 0;
        
            table += `<tbody><tr><th>${this.employeesObj.getEmployeeName(Number(id))}</th>`;
        
            Object.keys(this.jobsPeople[id]).forEach((date) => {
                let firstDate = true;
                if(firstPerson){
                    table += `<td>${ date }</td>`;
                    firstPerson = false;
                }else{
                    table += `<tr><td></td><td>${ date }</td>`;
                }
            
                Object.keys(this.jobsPeople[id][date]).forEach((depart) => {
                    let department = this.jobsPeople[id][date][depart];
                
                    if(firstDate){
                        table += `<td>${this.departmentsObj.getDepartmentName(Number(depart))}</td>`;
                        firstDate = false;
                    }else{
                        table += `<td></td><td></td><td>${this.departmentsObj.getDepartmentName(Number(depart))}</td>`;
                    }
                    table += `<td>Hour</td>`;
                
                    let sum: number = 0;
                    Object.keys(department['hour']).forEach((zone) => {
                        let hour = department['hour'][zone];
                        sum += hour;
                        table += `<td>${ hour/60 }</td>`;
                        dailyHour[zone] += hour;
                    });
                    table += `<td>${ sum /60 }</td>`;
                    table += `</tr>`;
                    // dailyHour += sum;

                    let tipString = '';
                    tipString += `<tr><td></td><td></td><td></td>`;
                    tipString += `<td>Tip</td>`;

                    // table += `<tr><td></td><td></td><td></td>`;
                    // table += `<td>Tip</td>`;
                    sum = 0;
                    Object.keys(department['tip']).forEach((zone) => {
                        let tip = department['tip'][zone]
                        sum += tip;
                        tipString += `<td>${ currency.format(tip) }</td>`;
                        dailyTip[zone] += tip;
                    });
                    tipString += `<td>${ currency.format(sum) }</td>`;
                    tipString += `</tr>`;

                    if(viewOption == 0)
                        table += tipString;

                    let wageString = '';
                    wageString += `<tr><td></td><td></td><td></td>`;
                    wageString += `<td>Wage</td>`;

                    sum = 0;
                    Object.keys(department['wage']).forEach((zone) => {
                        let wage = department['wage'][zone];
                        sum += wage;
                        wageString += `<td>${ currency.format(wage) }</td>`;
                        dailyWage[zone] += wage;
                    });
                    wageString += `<td>${ currency.format(sum) }</td>`;
                    wageString += `</tr>`;

                    if(viewOption == 0)
                        table += wageString;
                });
            });
        
            table += `<tr><td></td><td></td><td></td><td class="active">Total Hour</td>`;
            Object.keys(this.timeZones).forEach((zoneId) => {
                table += `<td class="active">${dailyHour[zoneId]/60}</td>`;
                dailyHour['sum'] += dailyHour[zoneId];
            });
            table += `<td class="active">${dailyHour['sum']/60}</td></tr>`;
        
            table += `<tr><td></td><td></td><td></td><td class="active">Total Tip</td>`;
            Object.keys(this.timeZones).forEach((zoneId) => {
                table += `<td class="active">${currency.format(dailyTip[zoneId])}</td>`;
                dailyTip['sum'] += dailyTip[zoneId];
            });
            table += `<td class="active">${currency.format(dailyTip['sum'])}</td></tr>`;
        
            table += `<tr><td></td><td></td><td></td><td class="active">Total Wage</td>`;
            Object.keys(this.timeZones).forEach((zoneId) => {
                table += `<td class="active">${currency.format(dailyWage[zoneId])}</td>`;
                dailyWage['sum'] += dailyWage[zoneId];
            });
            table += `<td class="active">${currency.format(dailyWage['sum'])}</td></tr>`;
        });
        table += `<tbody></table></div>`;
        return table;
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
                                    (this.employeesObj.getEmployeeRatio(Number(empId)) / 100) *
                                    departTip[zone] / departTime[zone];
                            this.jobsPeople[empId][date][depart]['tip'][zone]
                                = this.jobsDates[date][depart][empId]['tip'][zone];
                        }else{
                            this.jobsDates[date][depart][empId]['tip'][zone] = 0;
                            this.jobsPeople[empId][date][depart]['tip'][zone] = 0;
                        }

                        this.jobsDates[date][depart][empId]['wage'][zone]
                            = this.jobsDates[date][depart][empId]['hour'][zone] *
                                this.employeesObj.getEmployee(Number(empId)).getCurrentWage(date).wage
                                / 60;
                        this.jobsPeople[empId][date][depart]['wage'][zone]
                            = this.jobsDates[date][depart][empId]['wage'][zone];

                        console.log('empId: ',empId, 'date:',date, 'wage: ',
                            this.employeesObj.getEmployee(Number(empId)).getCurrentWage(date));//.wage);
                    });
                });
            });
        });
        console.log('calculateEmpTipsAndWages [jobsDates]: ', this.jobsDates);
        console.log('calculateEmpTipsAndWages [jobsPeople]: ', this.jobsPeople);
    }
    
    calculateDepartTips():void{
        Object.keys(this.jobsDates).forEach((date) => {
            let dayTipAmount = this.dailyT[date];
            
                // let totalRatio: number = 0;
            let totalRatio = {};
            let departRatio = {};

            Object.keys(this.jobsDates[date]).forEach((depart)=> {
                departRatio[depart] = {};
    
                Object.keys(this.jobsDates[date][depart]).forEach((empId)=> {
                    Object.keys(this.timeZones).forEach((zoneId) => {
                        if (this.jobsDates[date][depart][empId]['hour'][zoneId]) {
                            departRatio[depart][zoneId] = this.departmentsObj.getDepartRatio(Number(depart));
                            if (!(zoneId in totalRatio)) {
                                totalRatio[zoneId] = 0;
                            }
                        }
                    });
                });
    
                Object.keys(this.timeZones).forEach((zoneId) => {
                    if (departRatio[depart][zoneId]) {
                        totalRatio[zoneId] += departRatio[depart][zoneId];
                    }
                });
            });
            console.log('departRatio ========:', departRatio);
            console.log('totalRatio ========:', totalRatio);
        
            Object.keys(this.jobsDates[date]).forEach((depart)=>{
                Object.keys(this.timeZones).forEach((zone) => {
                    if (departRatio[depart][zone] && dayTipAmount) {
                        this.dailyHours[date][depart]['tip'][zone] = dayTipAmount[zone] * departRatio[depart][zone] / totalRatio[zone];
                    } else {
                        this.dailyHours[date][depart]['tip'][zone] = 0;
                    }
                });
            });
        });
        console.log('dailyHours =========:',this.dailyHours);
    }
    
    calculateHours(startN: number, endN: number): Object{
        console.log('calcurateHours: start: ', startN, 'end: ', endN);
        let hourObj: Object = {};

        for( var zone in this.timeZones){
            let zst = this.timeZones[zone].startT.timeNum;
            let zet = this.timeZones[zone].endT.timeNum;
            // console.log('zone: start: ', zst, 'end: ', zet);

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
    
    onSubmit(form: any): void {
        console.log("onSubmit: ",form);
    }
}
