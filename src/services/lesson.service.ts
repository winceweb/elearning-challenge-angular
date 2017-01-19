import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Lesson } from '../models/lesson';

@Injectable()
export class LessonService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private lessonsUrl = 'http://localhost:8000/api/v1/lesson';  // URL to web api

  constructor(private http: Http) { }

  getLessons(): Promise<Lesson[]> {
    return this.http.get(this.lessonsUrl)
               .toPromise()
               .then(response => response.json().data as Lesson[])
               .catch(this.handleError);
  }

  getLesson(id: number): Promise<Lesson> {
    const url = `${this.lessonsUrl}/${id}`;
    return this.http.get(url)
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

  create(name: string): Promise<Lesson> {
    return this.http
      .post(this.lessonsUrl, JSON.stringify({name: name}), {headers: this.headers})
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
