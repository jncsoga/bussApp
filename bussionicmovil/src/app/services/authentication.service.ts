import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import {EnvService} from './env.service';
import {Credential} from '../models/Credential';
import { AlertController} from '@ionic/angular';
import {ApiAccountService} from './apiAccount.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private apiAccount: ApiAccountService,
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
    const user = await this.apiAccount.login(credential.username, credential.password);
    if (user.activated) {
      console.log("corrrecto");
      this.env.user = user;
      return this.authenticationState.next(true);
    }
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Datos incorrectos.',
      buttons: ['OK']
    });

    await alert.present();
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
