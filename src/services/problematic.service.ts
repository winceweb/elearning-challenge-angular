import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Problematic } from '../models/problematic';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class ProblematicService {

  private problematicsUrl = 'http://learn.it-akademy.fr:8080/api/v1/problematic';  // URL to web api
  headers;
  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }

  getProblematics(): Promise<Problematic[]> {
    return this.http.get(this.problematicsUrl, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Problematic[])
               .catch(this.handleError);
  }

  getProblematicsByLesson(id: number): Promise<Problematic[]> {
    const url = `${'http://learn.it-akademy.fr:8080/api/v1/lesson'}/${id}${'/problematic'}`;
    return this.http.get(url, {headers: this.headers})
           .toPromise()
           .then(response => response.json().data as Problematic[])
           .catch(this.handleError);
  }

  getProblematic(id: number): Promise<Problematic> {
    const url = `${this.problematicsUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Problematic)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.problematicsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(problematic: Problematic): Promise<Problematic> {
    return this.http
      .post(this.problematicsUrl, JSON.stringify(problematic), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(problematic: Problematic): Promise<Problematic> {
    const url = `${this.problematicsUrl}/${problematic.idProblematic}`;
    return this.http
      .put(url, JSON.stringify(problematic), {headers: this.headers})
      .toPromise()
      .then(() => problematic)
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
