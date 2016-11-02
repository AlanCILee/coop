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
            startT: [ '00:00' ],
            endT: [ '00:00' ],
        });

        console.log('timeZone :',this.timeZones);
    }

    onSubmit(form: any): any{
        console.log('timezone form result: ',form);
        this.timeObj.addTimeZone(form.zoneName, form.startT, form.endT);
        this.clearInput();
    }

    zoneBtn(zone: any){
        console.log('click zoneBtn: ', zone);
        this.form.patchValue({
            zoneName: zone.key,
            startT: zone.val.startT.timeStr,
            endT: zone.val.endT.timeStr,
        });
    }

    clearInput(): void{
        this.form.patchValue({
            zoneName: '',
            startT: '00:00',
            endT: '00:00',
        });
    }
}