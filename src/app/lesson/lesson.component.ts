import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: 'lesson.component.html',
  styleUrls: [ 'lesson.component.css' ]
})
export class LessonComponent implements OnInit {
  lessons: Lesson[];
  selectedLesson: Lesson;

  constructor(
    private lessonService: LessonService,
    private router: Router) { }

  getLessons(): void {
    this.lessonService
        .getLessons()
        .then(lessons => this.lessons = lessons);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.lessonService.create(title)
      .then(lesson => {
        this.lessons.push(lesson);
        this.selectedLesson = null;
      });
  }

  delete(lesson: Lesson): void {
    this.lessonService
        .delete(lesson.id)
        .then(() => {
          this.lessons = this.lessons.filter(h => h !== lesson);
          if (this.selectedLesson === lesson) { this.selectedLesson = null; }
        });
  }

  ngOnInit(): void {
    this.getLessons();
  }


  gotoDetail(lesson: Lesson): void {
    this.router.navigate(['/lesson', lesson.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
