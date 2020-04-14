import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import {Credential} from '../../models/Credential';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credential: Credential;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    console.log("Log initial");
    this.credential = new Credential();
  }

  login() {
    this.authService.login(this.credential);
  }

}
