import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';

import { Lesson } from '../../models/lesson';
import { Category } from '../../models/category';
import { LessonService } from '../../services/lesson.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth.service';

import { FormBuilder, Validators } from '@angular/forms';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
  selector: 'app-lesson',
  templateUrl: 'lesson.component.html',
  styleUrls: [ 'lesson.component.css' ]
})
export class LessonComponent implements AfterViewInit {
  lessons: Lesson[];
  categories: Category[];
  selectedLesson: Lesson;
  isAuth: boolean = false;
  isTeacher: boolean = false;
  userName;
  noteLesson: any;
  private data: Observable<any>;
  private finished: boolean;
  private values: Lesson[];
  private anyErrors: boolean;

  public addLessonForm = this.fb.group({
    subject: ["", Validators.required],
    content: ["", Validators.required],
    idCategory: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    urlLesson: ["", Validators.required],
    image: ["", Validators.required]
  });

  constructor(
    private lessonService: LessonService,
    private userService: UserService,
    private router: Router, private auth: AuthService, private el:ElementRef,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
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
      .then(lessons => {
          this.lessons = lessons;

          this.data = new Observable(observer => {
              observer.next(this.lessons);
              for(let i = 0; i < this.lessons.length; ++i) {
                this.lessonService
                .getRatingLesson(this.lessons[i]['idLesson'])
                .then(noteLesson => {
                  this.noteLesson = noteLesson;
                  this.lessons[i]['image'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.lessons[i]['image']);
                  // console.log(this.lessons[i]['image']);
                  // console.log("idLesson --> " + this.lessons[i]['idLesson'] + " iteration --> "+ i +" Note --> " + this.noteLesson);
                  this.lessons[i]['noteLesson'] = this.noteLesson;
                  observer.next(this.lessons);
                });
              }
              setTimeout(() => {
                  observer.next(this.lessons);
                  observer.complete();
              }, 200);
          });

          let subscription = this.data.subscribe(
            value => this.values = value,
            error => this.anyErrors = true,
            () => jQuery(".starrr").starrr()
          );

      });
    }

    getCategories(): void {
      this.lessonService
      .getCategories()
      .then(categories => this.categories = categories);
    }

    getLesByCat(idCategory: number): void{
      this.lessonService
      .getLesByCat(idCategory)
      .then(lessons => {
          this.lessons = lessons;

          this.data = new Observable(observer => {
              observer.next(this.lessons);
              for(let i = 0; i < this.lessons.length; ++i) {
                this.lessonService
                .getRatingLesson(this.lessons[i]['idLesson'])
                .then(noteLesson => {
                  this.noteLesson = noteLesson;
                  // console.log("idLesson --> " + this.lessons[i]['idLesson'] + " iteration --> "+ i +" Note --> " + this.noteLesson);
                  this.lessons[i]['noteLesson'] = this.noteLesson;
                  observer.next(this.lessons);
                });
              }
              setTimeout(() => {
                  observer.next(this.lessons);
                  observer.complete();
              }, 200);
          });

          let subscription = this.data.subscribe(
            value => this.values = value,
            error => this.anyErrors = true,
            () => jQuery(".starrr").starrr()
          );

      });
    }

    addLesson(event) {
      if (!this.addLessonForm.value) { return; }
      this.lessonService.create(this.addLessonForm.value)
      .then(lesson => {
        this.values.push(this.addLessonForm.value);
      });
      // console.log(event);
      // console.log(this.addLessonForm.value);
    }

    delete(lesson: Lesson): void {
      this.lessonService
      .delete(lesson.idLesson)
      .then(() => {
        this.values = this.values.filter(h => h !== lesson);
        if (this.selectedLesson === lesson) { this.selectedLesson = null; }
      });
    }

    ngOnInit(): void {
      this.getLessons();
      this.getCategories();
    }


    gotoDetail(lesson: Lesson): void {
      this.router.navigate(['/lesson', lesson.idLesson]);
    }

    ngAfterViewInit() {

      jQuery(".starrr").starrr();

      jQuery("#stars").on('starrr:change', function(e, value){
        jQuery('#count').html(value);
      });

      jQuery('#stars-existing').on('starrr:change', function(e, value){
        jQuery('#count-existing').html(value);
      });


    }
  }


  /*
  Copyright 2016 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
  */
