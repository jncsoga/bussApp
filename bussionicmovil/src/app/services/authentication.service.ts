import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { AuthService} from './auth.service';
import {EnvService} from './env.service';
import {Credential} from '../models/Credential';
import { AlertController} from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private auth: AuthService,
              private env: EnvService, public alertController: AlertController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  async login(credential: Credential) {
    // await, para que espere a que responda el método y no lo haga asincrono, necesota que el metodo sea declarado como async
    await this.auth.login(credential.username, credential.password);
    if (this.env.user.activated) {
      console.log("corrrecto");
      return this.authenticationState.next(true);
    }
    console.log("incorrecto");
    this.authenticationState.next(false);
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}