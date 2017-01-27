import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Commentary } from '../models/commentary';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class CommentaryService {

  private commentaryUrl = 'http://learn.it-akademy.fr:8080/api/v1/problematic';  // URL to web api
  headers;
  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }

  getCommentary(id: number): Promise<Commentary[]> {
    const url = `${this.commentaryUrl}/${id}/commentary`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Commentary[])
      .catch(this.handleError);
  }

  delete(id: number, urlProblematic: string): Promise<void> {
    const url = `http://learn.it-akademy.fr:8080/api/v1${urlProblematic}/commentary/${id}`;
    console.log(url);
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(commentary: Commentary, urlProblematic: string): Promise<Commentary> {
    const url = `http://learn.it-akademy.fr:8080/api/v1${urlProblematic}/commentary`;
    return this.http
      .post(url, JSON.stringify(commentary), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(commentary: Commentary, id: number): Promise<Commentary> {
    const url = `${this.commentaryUrl}/${commentary.idCommentary}`;
    return this.http
      .put(url, JSON.stringify(commentary), {headers: this.headers})
      .toPromise()
      .then(() => commentary)
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
