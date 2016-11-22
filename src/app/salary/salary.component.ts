import { Component } from '@angular/core';
import { Response } from "@angular/http";

import { HttpComponent } from '../core/http.component';
import {API_ENDPOINT} from "../core/config";

@Component({
    selector: 'salary',
    templateUrl: 'salary.component.html',
    styleUrls: ['salary.component.css']
})

export class SalaryComponent {
    loading:boolean;
    data:Object;

    constructor(private httpComponent: HttpComponent){

    }

    request(): void {
        console.log('request() input');
        this.httpComponent.makeRequest(API_ENDPOINT+'/emp').subscribe((res: Response) => {
            this.data = res.json();
            this.loading = false;
            console.log('HttpComponent : ' + JSON.stringify(this.data));
        });
    }



}