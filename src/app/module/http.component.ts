import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpComponent {

    data: string;
    loading: boolean;

    constructor (public http: Http){}

    makeRequest(): void {
        console.log('HttpComponent : makeRequest');
        this.loading = true;
        this.http.get('http://localhost:3000/emp').subscribe((res : Response) => {
            this.data = res.json();
            this.loading = false;
            console.log('HttpComponent : '+JSON.stringify(this.data));
        });
    }
}