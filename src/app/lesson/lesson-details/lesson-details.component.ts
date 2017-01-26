import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router } from '@angular/router';
import { Lesson }        from '../../../models/lesson';
import { Problematic }        from '../../../models/problematic';
import { Note }        from '../../../models/note';
import { LessonService } from '../../../services/lesson.service';
import { ProblematicService } from '../../../services/problematic.service';


import { FormBuilder, Validators } from '@angular/forms';

import {Observable} from 'rxjs/Observable';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
  selector: 'app-lesson-details',
  templateUrl: 'lesson-details.component.html',
  styleUrls: [ 'lesson-details.component.css' ]
})
export class LessonDetailsComponent implements OnInit {
  lesson: Lesson;
  lessons: Lesson[];
  problematic: Problematic;
  problematics: Problematic[];
  selectedLesson: Lesson;
  countLessons: string;
  note: any;
  currentId: any;
  addProblematicUrl: string;
  private data: Observable<any>;
  private finished: boolean;
  private anyErrors: boolean;
  message: string;

  public addProblematiqueForm = this.fb.group({
    entitled: ["", Validators.required],
    movieUrl: ["", Validators.required],
    caption: ["", Validators.required]
  });


  constructor(
    private lessonService: LessonService,
    private problematicService: ProblematicService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public fb: FormBuilder
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
        this.currentId = params['id'];
    });

    console.log(this.currentId);

    this.route.params
      .switchMap((params: Params) => this.lessonService.getLesson(+params['id']))
      .subscribe(lesson => this.lesson = lesson);

    this.route.params
      .switchMap((params: Params) => this.problematicService.getProblematicsByLesson(+params['id']))
      .subscribe(problematics => {
        this.problematics = problematics;
        if(problematics.length > 1){
          this.countLessons = problematics.length+" problématiques en relation avec ce cours";
        }else{
          this.countLessons = "Une problématique en relation avec ce cours";
        }
      });

      this.getNoteLesson();

  }

  save(): void {
    this.lessonService.update(this.lesson)
      .then(() => this.goBack());
  }

  getNoteLesson(){
    this.route.params
    .switchMap((params: Params) => this.lessonService.getRatingLesson(+params['id']))
    .subscribe(note => {
      this.note = note;

      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(this.note);
              observer.complete();
          }, 200);
      });

      let subscription = this.data.subscribe(
        value => this.note = value,
        error => this.anyErrors = true,
        () => this.launchjquery(this.currentId)
      );

    });

  }



  goBack(): void {
    this.location.back();
  }

  gotoDetail(problematic: Problematic): void {
    this.router.navigate(['/problematic', problematic.idProblematic]);
  }

  launchjquery(id: number): void{

    jQuery(".starrr").starrr();

    jQuery("#myModal #stars").on('starrr:change', (e, value) => {
      // jQuery('#myModal #count').html(value);
      // console.log(id + " --- " + value);
      this.lessonService.rateLesson(id, value)
      .then(message => {
        this.message = message;
      }).catch((message) => {
        this.message = JSON.parse(message._body).message;
      });
    });

    // jQuery('#stars-existing').on('starrr:change', function(e, value){
    //   jQuery('#count-existing').html(value);
    // });
  }

  addProblematique(event) {
    if (!this.addProblematiqueForm.value) { return; }
    this.addProblematicUrl = this.router.url;
    console.log(this.addProblematicUrl);
    this.problematicService.create(this.addProblematiqueForm.value, this.addProblematicUrl)
    .then(lesson => {
      this.problematics.push(this.addProblematiqueForm.value);
    });
    // console.log(event);
    console.log(this.addProblematiqueForm.value);
  }



}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
