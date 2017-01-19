import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Lesson } from '../models/lesson'

@Injectable()
export class AuthService {
  isAuthenticated: boolean = false;
  userId;
  windowHandle;
  ourcode;
  accesstoken;
  constructor(private http: Http, private router: Router) { }

  login(usercreds){
    var headers = new Headers();
    var creds = 'username=' + usercreds.username + '&password=' + usercreds.password + '&client_id=id1&client_secret=secret1&grant_type=password';

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve) => {
      this.http.post('http://localhost:8000/oauth/access_token', creds, {headers: headers}).subscribe((data) => {
        if(data.json().success) {
          this.userId = data.json().userId;
          this.isAuthenticated = true;}
          resolve(this.isAuthenticated);
        }
      )

    })
  }

  authorizeuser() {
    this.windowHandle = window.open('http://localhost:8000/oauth2/authorize?client_id=XRnnexpe7N&response_type=code&redirect_uri=http://localhost:4200/dashboard');
    var href;

    setTimeout(() => {
      href = this.windowHandle.location.href;

      this.windowHandle.close();
      var extractedcode = href.split('=');
      this.ourcode = extractedcode[1];
      if(this.ourcode)
      this.getAccessToken();
      else
      console.log('Access denied. Try again');
    },5000);
  }


  addclient(newclient) {
    let appid = this.randomstring(10);
    let appsecret = this.randomstring(10);

    var headers = new Headers();
    var client = 'name=' + newclient + '&id=' + appid + '&secret=' + appsecret + '&userId=' + this.userId;

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    return new Promise((resolve) => {
      this.http.post('http://localhost:8000/clients', client, {headers: headers}).subscribe((data) => {
        if(data.json().success) {
          resolve(data);
        }
      })
    })
  }


  randomstring (len) {
    var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;
    for (var i = 0; i < len; ++i) {
      buf.push(chars[this.getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
  };
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  addlesson(newlesson) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.accesstoken);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    var book = 'subject=' + newlesson.subject + '&content=' + newlesson.content + '&idUser=' + newlesson.idUser + '&startDate=' + newlesson.startDate + '&endDate=' + newlesson.endDate;
    return new Promise((resolve) => {
      this.http.post('http://localhost:8000/lesson', book, {headers: headers}).subscribe((data) => {

        console.log(data);

        resolve(data);

      })

    })

  }



  getLessons(): Promise<Lesson[]> {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.accesstoken);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    return this.http.get('http://localhost:8000/lesson')
               .toPromise()
               .then(response => response.json().data as Lesson[])
               .catch(this.handleError);
  }

  getLesson(id: number): Promise<Lesson> {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.accesstoken);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    const url = `${'http://localhost:8000/lesson'}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Lesson)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.accesstoken);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    const url = `${'http://localhost:8000/lesson'}/${id}`;
    return this.http.delete(url, {headers: headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(subject: string): Promise<Lesson> {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.accesstoken);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    return this.http
      .post('http://localhost:8000/lesson', JSON.stringify({subject: subject}), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(lesson: Lesson): Promise<Lesson> {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer '+ this.accesstoken);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    const url = `${'http://localhost:8000/lesson'}/${lesson.idLesson}`;
    return this.http
      .put(url, JSON.stringify(lesson), {headers: headers})
      .toPromise()
      .then(() => lesson)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }






  getAccessToken() {
    let client_id = 'XRnnexpe7N';
    let client_secret= 'tUskPBzu64';
    var basicheader = btoa(client_id + ':' + client_secret);

    var headers = new Headers();

    headers.append('Authorization', 'Basic '+ basicheader);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:4200/books';

    this.http.post('http://localhost:8000/oauth2/token', tokendata, {headers: headers}).subscribe((data) => {


      this.accesstoken = data.json().access_token;
      console.log(this.accesstoken);
      this.router.navigate(['/books']);
    })
  }

}
