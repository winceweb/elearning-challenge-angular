import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson.service';
import { AuthService } from '../auth.service';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lesson',
  templateUrl: 'lesson.component.html',
  styleUrls: [ 'lesson.component.css' ]
})
export class LessonComponent implements OnInit {
  lessons: Lesson[];
  selectedLesson: Lesson;
  isAuth: boolean = false;
  isTeacher: boolean = false;
  userName;

  public addLessonForm = this.fb.group({
    subject: ["", Validators.required],
    content: ["", Validators.required],
    idCategory: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required]
  });

  constructor(
    private lessonService: LessonService,
    private router: Router,
    private authService: AuthService,
    public fb: FormBuilder) {
      this.isAuth = this.authService.isAuthenticated;
      this.isTeacher = this.authService.isTeacher;

      let userRole = this.authService.infoUser();
      userRole.then((res) => {
        if (res.isTeacher == 1){
          this.isTeacher = true;
          console.log('Tu es un Teacher !!');
        }
      });


    }

  getLessons(): void {
    this.lessonService
        .getLessons()
        .then(lessons => this.lessons = lessons);

  }

  addLesson(event) {
    if (!this.addLessonForm.value) { return; }
    this.lessonService.create(this.addLessonForm.value)
      .then(lesson => {
        this.lessons.push(this.addLessonForm.value);
      });
    // console.log(event);
    // console.log(this.addLessonForm.value);
  }

  delete(lesson: Lesson): void {
    this.lessonService
        .delete(lesson.idLesson)
        .then(() => {
          this.lessons = this.lessons.filter(h => h !== lesson);
          if (this.selectedLesson === lesson) { this.selectedLesson = null; }
        });
  }

  ngOnInit(): void {
    this.getLessons();
  }


  gotoDetail(lesson: Lesson): void {
    this.router.navigate(['/lesson', lesson.idLesson]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
