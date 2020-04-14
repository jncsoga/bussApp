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
    user: User;

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
        await this.http.get<any>(this.env.API_URL + "api/account", {headers: headers}).subscribe({
            next: data => this.user = data,
            error: error => console.error('Error', error)
        });
        console.log(this.user);
        this.env.user = this.user;
     }


}
