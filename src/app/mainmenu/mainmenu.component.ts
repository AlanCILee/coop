import { Component } from '@angular/core';
import { HttpComponent } from '../module/http.component';
import {loadavg} from "os";

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
        console.log ('request() input');
        this.httpComponent.makeRequest();
    }



}