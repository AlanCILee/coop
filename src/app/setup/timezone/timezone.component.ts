import { Component, OnInit, Pipe } from '@angular/core';
import { TimeTable, Time, TimeZone } from "../../model/time";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'timezone',
    templateUrl: 'timezone.component.html',
    styleUrls: ['timezone.component.css'],
})

export class TimezoneComponent implements OnInit {

    timeTable: Time[] = [];
    form: FormGroup;
    btnName: string = 'Add';
    timeZones: Object =[];

    constructor(private timeObj: TimeTable,
                private fb: FormBuilder){
    }

    ngOnInit(){
        this.timeTable = this.timeObj.timeTable;
        this.timeObj.loadMockTimeZone();
        this.timeZones = this.timeObj.timeZones;
        this.form = this.fb.group({
            zoneName: [ '' ],
            startT: [ '' ],
            endT: [ '' ],
        });

        console.log('timeZone :',this.timeZones);
    }

    ngOnChange(){
        console.log('ngOnChange: timezone');
    }

    onSubmit(form: any): any{
        this.timeZones = this.timeObj.addTimeZone(form.zoneName, form.startT, form.endT);
    }
}