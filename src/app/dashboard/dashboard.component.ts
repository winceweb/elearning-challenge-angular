import { Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson';
import { Category } from '../../models/category';

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';

declare var jQuery: any;
declare var bootstrap: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  lessons: Lesson[];
  categories: Category[];

  private data: Observable<any>;
  private finished: boolean;
  private values: Lesson[];
  private anyErrors: boolean;
  noteLesson: any;

  constructor(private router: Router, private auth: AuthService, private el:ElementRef, private lessonService: LessonService, private sanitizer: DomSanitizer) { }

  ngAfterViewInit() {

    // return jQuery(".starrr").starrr();

	 // jQuery("#stars").on('starrr:change', function(e, value){
     // jQuery('#count').html(value);
    // q});

   // jQuery('#stars-existing').on('starrr:change', function(e, value){
    //  jQuery('#count-existing').html(value);
   // });

   this.getLesByCat(1);
   this.getCategories();

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

    gotoDetail(lesson: Lesson): void {
      this.router.navigate(['/lesson', lesson.idLesson]);
    }


}
