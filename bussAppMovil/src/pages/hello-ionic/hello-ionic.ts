import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  user: string;
  password: string;
  result: any;
  error: string;
  url = 'http://localhost:8080/api/account';
  apiKey = 'YWMzMWZhY2QxMmJhODM2NWI4OTIyOTdhYTIxNTlhYjdmYjY5OTg2Yzg4YzM1MjVkMTQwZWVkNTRmZjVkYWEyNDQ3OGViNjA5ZDY1ZmM5ZmU3OGZjZGIzNjYxODZjYmJhYjYyN2VlMDVlZjkxNWEwYWI4Yzc2MmRmNjc2MWNjYTk'; // <-- Enter your own key here!

  constructor(public alertCtrl: AlertController) {

  }
  showAlert() {
    // this.http.get(this.url, {
    //   headers: new HttpHeaders().set('Authorization', this.apiKey),
    // })
    //   .subscribe(data => {
    //     this.result = JSON.stringify(data);
    //     let alert = this.alertCtrl.create({
    //       title: 'Datos usuario',
    //       subTitle: this.result,
    //       buttons: ['OK']
    //     },
    //       err=> {
    //       this.error = 'Erroro';
    //       });
    //     alert.present();
    //   });

    let alert = this.alertCtrl.create({
      title: 'Datos usuario',
      subTitle: this.user,
      buttons: ['OK']
    });
    alert.present();
  }
}
