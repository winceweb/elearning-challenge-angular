import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth.service';

import { FormBuilder, Validators } from '@angular/forms';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: [ 'user.component.css' ]
})
export class UserComponent implements OnInit {
  users: User[];
  selectedUser: User;
  isAuth: boolean = false;
  isTeacher: boolean = false;
  userName;
  private data: Observable<Array<number>>;

  public addUserForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    isTeacher: ["", Validators.required],
    isActive: ["", Validators.required],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
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

  getUsers(): void {
    this.userService
        .getUsers()
        .then(users => {
          this.users = users;
          this.data = new Observable(observer => {
              observer.next(this.users);
              for (let i = 0; i < this.users.length; i++) {
                this.users[i]['rateUser'] = Math.floor((Math.random()*5)+1);
              }
              setTimeout(() => {
                observer.next(this.users);
                observer.complete();
                jQuery(".starrr").starrr();
                observer.complete();
              }, 200);
          });

          let subscription = this.data.subscribe(
              () => jQuery(".starrr").starrr()
          );
        });
  }

  getRandomRating(){
    return Math.floor((Math.random()*5)+1);
  };

  addUser(event) {
    if (!this.addUserForm.value) { return; }
    this.addUserForm.value["password"] = "secret";
    if(this.addUserForm.value["isTeacher"] == true) {
      this.addUserForm.value["isTeacher"] = 1;
    }else{
      this.addUserForm.value["isTeacher"] = 0;
    }

    if(this.addUserForm.value["isActive"] == true) {
      this.addUserForm.value["isActive"] = 1;
    }else{
      this.addUserForm.value["isActive"] = 0;
    }
    this.addUserForm.value["image"] = "1";
    this.userService.create(this.addUserForm.value)
      .then(user => {
        this.users.push(this.addUserForm.value);
      });
    // console.log(event);
    console.log(this.addUserForm.value);

    this.route.params
      .switchMap((params: Params) => this.userService.getUsers())
      .subscribe(users => {
        this.users = users;

        for(let i = 0; i < this.users.length; ++i) {
          if(this.users[i].email == this.addUserForm.value.email) {
            this.router.navigate(['/user', this.users[i].idUser]);
          }
        }
      });
  }

  delete(user: User): void {
    this.userService
        .delete(user.idUser)
        .then(() => {
          this.users = this.users.filter(h => h !== user);
          if (this.selectedUser === user) { this.selectedUser = null; }
        });
  }

  ngOnInit(): void {
    this.getUsers();
  }


  gotoDetail(user: User): void {
    this.router.navigate(['/user', user.idUser]);
  }


}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
