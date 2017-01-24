import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { Problematic } from '../../models/problematic';
import { ProblematicService } from '../../services/problematic.service';
import { AuthService } from '../auth.service';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-problematic',
  templateUrl: './problematic.component.html',
  styleUrls: ['./problematic.component.css']
})
export class ProblematicComponent implements OnInit {
  problematics: Problematic[];
	problematic: Problematic;
	selectedProblematic: Problematic;
	isAuth: boolean = false;
	isTeacher: boolean = false;
	userName;

  constructor(
    private problematicService: ProblematicService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService)
    {}



  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.problematicService.getProblematic(+params['id']))
      .subscribe(problematic => this.problematic = problematic);
  }
/*
  gotoDetail(problematic: Problematic): void {
    this.router.navigate(['/problematic', problematic.idProblematic]);
  }
  */

}