import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import {EnvService} from '../../services/env.service';
import {User} from '../../models/User';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthenticationService, private envService: EnvService) { }

  ngOnInit() {
    console.log(this.envService.user);
  }

  logout() {
    this.authService.logout();
  }

}
