import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router } from '@angular/router';
import { Lesson }        from '../../../models/lesson';
import { Problematic }        from '../../../models/problematic';
import { LessonService } from '../../../services/lesson.service';
import { ProblematicService } from '../../../services/problematic.service';

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

  constructor(
    private lessonService: LessonService,
    private problematicService: ProblematicService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
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


  }

  save(): void {
    this.lessonService.update(this.lesson)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  gotoDetail(problematic: Problematic): void {
    this.router.navigate(['/problematic', problematic.idProblematic]);
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
