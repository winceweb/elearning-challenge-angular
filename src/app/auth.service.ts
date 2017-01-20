import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { Lesson } from '../models/lesson'

@Injectable()
export class AuthService {
  isAuthenticated: boolean = false;
  userId;
  windowHandle;
  ourcode;
  accesstoken;
  headers;
  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {
    if(this.localStorageService.get('token') != ""){
      this.headers = new Headers();
      this.headers.append('Accept', 'application/json');
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.headers.append('Authorization', 'Bearer '+ this.localStorageService.get('token'));

      this.localStorageService.set('headers', this.headers);
    }
  }

  login(usercreds){
    var headers = new Headers();
    var creds = 'username=' + usercreds.username + '&password='+ usercreds.password +'&client_id=id1&client_secret=secret1&grant_type=password';
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve) => {
      this.http.post('http://localhost:8000/oauth/access_token', creds, {headers: headers}).subscribe((data) => {

          if(data.json().access_token != "") {
            this.isAuthenticated = true;
            this.localStorageService.set('token', data.json().access_token);
          }
          resolve(this.isAuthenticated);
        }
      )

    })
  }

}
