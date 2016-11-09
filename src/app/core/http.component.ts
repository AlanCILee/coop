import { Http, Response, Headers} from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpComponent {

    data: string;
    loading: boolean;

    constructor (public http: Http){}

    makeRequest(url: string): Observable<Response> {
        console.log('HttpComponent : makeRequest');
        this.loading = true;

        return this.http.get(url);
        // this.http.get('http://localhost:3000/emp').subscribe((res : Response) => {
        //     this.data = res.json();
        //     this.loading = false;
        //     console.log('HttpComponent : '+JSON.stringify(this.data));
        // });
    }

    makePostRequest(url: string, body: Object): Observable<Response> {
        console.log('makePostRequest url :', url, 'body: ', body);
        
        let headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/json');

        return this.http.post(url, JSON.stringify(body), { headers: headers });
        // return this.http.post(url, body, { headers: headers });
        // this.http.get('http://localhost:3000/emp').subscribe((res : Response) => {
        //     this.data = res.json();
        //     this.loading = false;
        //     console.log('HttpComponent : '+JSON.stringify(this.data));
        // });
    }
}