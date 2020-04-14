import { Injectable } from '@angular/core';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8080/';
  user: User;

  constructor() { }
}
