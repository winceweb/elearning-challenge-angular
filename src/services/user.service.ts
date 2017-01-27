import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { Problematic } from '../models/problematic';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {

  private usersUrl = 'http://learn.it-akademy.fr:8000/api/v1/users';  // URL to web api
  headers;
  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as User[])
               .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(user: User): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user.idUser}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  getUserProblematics(id: number): Promise<Problematic[]> {
    const url = `${'http://learn.it-akademy.fr:8000/api/v1/liste/oeuvre'}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Problematic[])
      .catch(this.handleError);

  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
