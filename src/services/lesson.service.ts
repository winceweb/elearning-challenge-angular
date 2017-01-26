import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Lesson } from '../models/lesson';
import { Category } from '../models/category';
import { Ratings } from '../models/ratings';
import { Note } from '../models/note';

import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LessonService {

  private lessonsUrl = 'http://localhost:8000/api/v1/lesson';  // URL to web api
  headers;
  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }

  getLessons(): Promise<Lesson[]> {
    return this.http.get(this.lessonsUrl, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Lesson[])
               .catch(this.handleError);
  }

  getLesson(id: number): Promise<Lesson> {
    const url = `${this.lessonsUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Lesson)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.lessonsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(lesson: Lesson): Promise<Lesson> {
    return this.http
      .post(this.lessonsUrl, JSON.stringify(lesson), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  rateLesson(id: number, value: number): Promise<string> {
    console.log('entre dans rateLesson');
    return this.http
      .post('http://localhost:8000/api/v1/ratings', {rateable_id: id, value: value, rateable_type: 1}, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(lesson: Lesson): Promise<Lesson> {
    const url = `${this.lessonsUrl}/${lesson.idLesson}`;
    return this.http
      .put(url, JSON.stringify(lesson), {headers: this.headers})
      .toPromise()
      .then(() => lesson)
      .catch(this.handleError);
  }

  getCategories(): Promise<Category[]> {
    return this.http.get('http://localhost:8000/api/v1/category', {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Category[])
               .catch(this.handleError);
  }

  getLesByCat(idCategory: number): Promise<Lesson[]> {
    return this.http.get(`${'http://localhost:8000/api/v1/lesByCat'}/${idCategory}`, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Lesson[])
               .catch(this.handleError);
  }

  getRatingLesson(idLesson: number): Promise<Ratings>{
    return this.http.get(`${'http://localhost:8000/api/v1'}/1/ratings/${idLesson}`, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Ratings)
               .catch(this.handleError);
  }
  getRatingProblematic(idProblematic: number): Promise<void>{
    return this.http.get(`${'http://localhost:8000/api/v1'}/2/ratings/${idProblematic}`, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data)
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
