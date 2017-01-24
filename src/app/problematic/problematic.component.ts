import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


import { Problematic } from '../../models/problematic';
import { ProblematicService } from '../../services/problematic.service';
import { Commentary } from '../../models/commentary';
import { CommentaryService } from '../../services/commentary.service';
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
  commentaries: Commentary[];
	isAuth: boolean = false;
	isTeacher: boolean = false;
	userName;
  newMovieUrl;
  urlEncoding;

  constructor(
    private problematicService: ProblematicService,
    private commentaryService: CommentaryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer)
    {
       this.route.params
      .switchMap((params: Params) => this.problematicService.getProblematic(+params['id']))
      .subscribe(problematic => {
        this.problematic = problematic
        this.urlEncoding = "https://www.youtube.com/embed/"+this.problematic.movieUrl;
        this.newMovieUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(this.urlEncoding);
        console.log(this.problematic);
      });

       this.route.params
      .switchMap((params: Params) => this.commentaryService.getCommentary(+params['id']))
      .subscribe(commentaries => this.commentaries = commentaries);


      // console.log(this.newMovieUrl);
    }



  ngOnInit(): void {
   
  }
/*
  gotoDetail(problematic: Problematic): void {
    this.router.navigate(['/problematic', problematic.idProblematic]);
  }
  */

}