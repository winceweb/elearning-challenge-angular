import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router } from '@angular/router';
import { User }        from '../../../models/user';
import { Problematic }        from '../../../models/problematic';
import { UserService } from '../../../services/user.service';
import { ProblematicService } from '../../../services/problematic.service';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: [ 'user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {
  user: User;
  problematic: Problematic;
  problematics: Problematic[];
  selectedUser: User

  constructor(
    private userService: UserService,
    private problematicService: ProblematicService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(+params['id']))
      .subscribe(user => this.user = user);

    this.route.params
      .switchMap((params: Params) => this.userService.getUserProblematics(+params['id']))
      .subscribe(problematics => this.problematics = problematics);
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

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
