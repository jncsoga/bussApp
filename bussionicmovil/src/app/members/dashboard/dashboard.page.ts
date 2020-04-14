import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import {EnvService} from '../../services/env.service';
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthenticationService, private envService: EnvService, public platform: Platform) { }

  ngOnInit() {
    console.log(this.envService.user);
    this.platform.ready().then(() => this.loadMap());
  }


  loadMap() {
    /* The create() function will take the ID of your map element */
    const map = GoogleMaps.create('map');

    map.one( GoogleMapsEvent.MAP_READY ).then((data: any) => {
      const coordinates: LatLng = new LatLng(41, -87);

      map.setCameraTarget(coordinates);
      map.setCameraZoom(8);
    });
  }

  logout() {
    this.authService.logout();
  }

}
