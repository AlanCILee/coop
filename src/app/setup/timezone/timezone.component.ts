import { Component, OnInit, Pipe } from '@angular/core';
import { TimeTable, Time, TimeZone } from "../../model/time";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpComponent } from "../../core/http.component";
import { Response } from "@angular/http";

@Component({
    selector: 'timezone',
    templateUrl: 'timezone.component.html',
    styleUrls: ['timezone.component.css'],
})

export class TimezoneComponent implements OnInit {

    timeTable: Time[] = [];
    form: FormGroup;
    timeZones: Object =[];
    timeZonesHistory: Object =[];
    editItem: any = null;

    constructor(private timeObj: TimeTable,
                private httpComp: HttpComponent,
                private fb: FormBuilder){
    }

    ngOnInit(){
        this.timeTable = this.timeObj.timeTable;
        // this.timeObj.loadMockTimeZone();
        this.timeZones = this.timeObj.timeZones;
        this.timeZonesHistory = this.timeObj.timeZonesHistory;
        this.form = this.fb.group({
            zoneId: [ -1 ],
            zoneName: [ '' ],
            startT: [ '00:00' ],
            endT: [ '00:00' ],
        });

        console.log('timeZone :',this.timeZones);
    }

    onSubmit(form: any): any{
        console.log('timezone form result: ',form);
    
        if( form.zoneId > 0){  // update case
            this.httpComp.makePostRequest('http://localhost:3000/upTimeZone',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);
            
                if( Number(response.insertId) > 0){
                    console.log('update successfully :', response.insertId );
                    this.timeObj.addTimeZone(form.zoneId, form.zoneName, form.startT, form.endT, false);
                    this.timeObj.addTimeZone(response.insertId, form.zoneName, form.startT, form.endT, true);
                }else{
                    console.log('invalid zone :');
                }
            });
        }else {             // insert case
            this.httpComp.makePostRequest('http://localhost:3000/newTimeZone',form).subscribe((res : Response) => {
                let response = res.json();
                console.log('HttpComponent : ',response);
            
                if( Number(response.insertId) > 0){
                    console.log('insert successfully :', response.insertId );
                    this.timeObj.addTimeZone(response.insertId, form.zoneName, form.startT, form.endT, true);
                }else{
                    console.log('invalid zone :', response.insertId);
                }
            });
        }
        this.clearInput();
    }

    zoneBtn(zone: any){
        console.log('click zoneBtn: ', zone);
        this.form.patchValue({
            zoneId: zone.val.zoneId,
            zoneName: zone.val.zoneName,
            startT: zone.val.startT.timeStr,
            endT: zone.val.endT.timeStr,
        });
        this.editItem = zone;
    }

    clearInput(): void{
        this.form.patchValue({
            zoneName: '',
            startT: '00:00',
            endT: '00:00',
        });
        this.editItem = null;
    }

    deleteItem(): void {
        this.httpComp.makePostRequest('http://localhost:3000/rmTimeZone',{ zoneId: this.editItem.val.zoneId }).subscribe((res : Response) => {
            let response = res.json();
            console.log('HttpComponent : ',response);
        
            if( Number(response.affectedRows) > 0){
                console.log('update successfully :', this.editItem.val.zoneId );
                // this.timeObj.addTimeZone(this.editItem.val.zoneId, this.editItem.val.zoneName, this.editItem.val.startT, this.editItem.val.endT, false);
                this.timeObj.removeTimeZone(this.editItem.val.zoneId, this.editItem.val.zoneName);
            }else{
                console.log('invalid zone :');
            }
            this.clearInput();
        });
        
    }
    
    getZoneNumber(): number {
        let cnt: number = 0;
        
        Object.keys(this.timeZonesHistory).forEach((zoneId)=>{
            if(this.timeZonesHistory[zoneId].valid){
                cnt++;
            }
        })
        
        return cnt;
    }
}