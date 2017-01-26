import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { Problematic } from '../../models/problematic';
import { ProblematicService } from '../../services/problematic.service';
import { Commentary } from '../../models/commentary';
import { CommentaryService } from '../../services/commentary.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson.service';
import { AuthService } from '../auth.service';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-problematic',
  templateUrl: './problematic.component.html',
  styleUrls: ['./problematic.component.css']
})
export class ProblematicComponent implements OnInit {
  // problematics: Problematic[];
  problematic: Problematic;
  selectedProblematic: Problematic;
  lesson: Lesson;
  commentaries: Commentary[];
  user: User;
	isAuth: boolean = false;
	isTeacher: boolean = false;
	userName;
  newMovieUrl;
  lessonName;
  urlEncoding;
  urlProblematic;

  private data: Observable<any>;
  private values: Commentary[];
  private anyErrors: boolean;

  constructor(
    private problematicService: ProblematicService,
    private commentaryService: CommentaryService,
    private userService: UserService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    public fb: FormBuilder)
    {
       this.route.params
      .switchMap((params: Params) => this.problematicService.getProblematic(+params['id']))
      .subscribe(problematic => {
        this.problematic = problematic
        this.urlEncoding = "https://www.youtube.com/embed/"+this.problematic.movieUrl;
        this.newMovieUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(this.urlEncoding);


         this.route.params
        .switchMap((params: Params) => this.lessonService.getLesson(this.problematic.idLesson))
        .subscribe(lesson => {
          this.lesson = lesson;
          this.lessonName = this.lesson.subject;
          

        });
      });


      this.route.params
      .switchMap((params: Params) => this.commentaryService.getCommentary(+params['id']))
      .subscribe(commentaries => {
        this.commentaries = commentaries;

        this.data = new Observable(observer =>{
          observer.next(this.commentaries);
          for (let i = 0; i < this.commentaries.length; i++) {
            this.userService
              .getUser(this.commentaries[i]["idUser"])
              .then(user =>{
                this.user = user;
                this.commentaries[i]['username'] = this.user.name;
              })
          }
          setTimeout(() => {
            observer.next(this.commentaries);
            observer.complete();
          }, 200);
        })

        let subscription = this.data.subscribe(
          value => this.values = value,
          error => this.anyErrors = true
          )
      });
    }

  public addCommentaryForm = this.fb.group({
    description: ["", Validators.required]
  });

  addCommentary(event) {
    this.urlProblematic = this.router.url;
    if (!this.addCommentaryForm.value) { return; }
    this.commentaryService.create(this.addCommentaryForm.value, this.urlProblematic)
      .then(commentaries => {
        this.commentaries.push(this.addCommentaryForm.value);
      });
    console.log(this.addCommentaryForm.value);
  }


  ngOnInit(): void {
   
  }

}