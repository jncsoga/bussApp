import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { catchError, map, tap } from 'rxjs/operators';
import { Jnc} from '../models/Jnc';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    token: any;
    postId: string;
    jnc: Jnc;

    constructor(
        private http: HttpClient,
        private env: EnvService
    ) { }

     login(user: string, password: string) {
        console.log(user + ":" + password);
        console.log(btoa(user + ":" + password));
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8','Authorization':'Basic YWRtaW46YWRtaW4='});
         const body = JSON.stringify({username: user,
             password: password});
        console.log(headers);
        this.http.get<any>(this.env.API_URL + "api/jnc", {headers: headers}).subscribe({
            next: data => this.jnc = data,
            error: error => console.error('Error', error)
        });
        console.log(this.jnc);

        this.http.post<any>(this.env.API_URL + "api/jnc", this.jnc, {headers: headers}).subscribe({
            next: data => this.jnc = data,
            error: error => console.error('Error', error)
        });
     }


}
