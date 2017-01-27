import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router } from '@angular/router';
import { User }        from '../../../models/user';
import { Problematic }        from '../../../models/problematic';
import { Lesson }        from '../../../models/lesson';
import { UserService } from '../../../services/user.service';
import { ProblematicService } from '../../../services/problematic.service';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: [ 'user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {
  user: User;
  problematic: Problematic;
  problematics: Problematic[];
  lessons: Lesson[];
  selectedUser: User
  countLessons: string;
  countLessonsTeacher: string;

  constructor(
    private userService: UserService,
    private problematicService: ProblematicService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    jQuery(".modal-backdrop").removeClass("in");
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(+params['id']))
      .subscribe(user => this.user = user);

    this.route.params
      .switchMap((params: Params) => this.userService.getUserProblematics(+params['id']))
      .subscribe(problematics => {
        this.problematics = problematics
        if(problematics.length > 1){
          this.countLessons = problematics.length+" problématiques posées par cet élève";
        }else if(problematics.length == 0){
          this.countLessons = "Aucune problématique encore posée par cet élève";
        }else{
          this.countLessons = "Une problématique posée par cet élève";
        }
      });

      this.route.params
        .switchMap((params: Params) => this.lessonService.getLessons())
        .subscribe(lessons => {
          this.lessons = lessons
          if(lessons.length > 1){
            this.countLessonsTeacher = lessons.length+" formations faites par ce professeur";
          }else if(lessons.length == 0){
            this.countLessons = "Aucune formation encore faite par ce professeur";
          }else{
            this.countLessonsTeacher = "Une formation faite par ce professeur";
          }
        });
  }

  save(): void {
    this.userService.update(this.user)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  gotoDetail(problematic: Problematic): void {
    this.router.navigate(['/problematic', problematic.idProblematic]);
  }

  gotoDetailLesson(lesson: Lesson): void {
    this.router.navigate(['/lesson', lesson.idLesson]);
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
