import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class ApiAccountService {
    constructor(
        private http: HttpClient,
        private env: EnvService
    ) { }

     async login(user: string, password: string) {
        console.log(user + ":" + password);
        console.log(btoa(user + ":" + password));
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'
            ,'Authorization':'Basic ' + btoa(user + ":" + password) });
        console.log(headers);
        return await this.http.get<any>(this.env.API_URL + "api/account", {headers: headers}).toPromise().then(data => {
            return data;
        }).catch(error => {
            console.log(error);
            return new User();
        });
     }


}
