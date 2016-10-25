import { Component } from '@angular/core';
import { Response } from "@angular/http";

import { HttpComponent } from '../module/http.component';

@Component({
    selector: 'mainmenu',
    templateUrl: './mainmenu.component.html',
    styleUrls: ['./mainmenu.component.css']
})

export class MainMenuComponent {
    loading:boolean;
    data:Object;

    constructor(private httpComponent: HttpComponent){

    }

    request(): void {
        console.log('request() input');
        this.httpComponent.makeRequest('http://localhost:3000/emp').subscribe((res: Response) => {
            this.data = res.json();
            this.loading = false;
            console.log('HttpComponent : ' + JSON.stringify(this.data));
        });
    }



}