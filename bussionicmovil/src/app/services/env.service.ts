import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://localhost:8080/';
  username: string;
  password: string;

  constructor() { }
}
