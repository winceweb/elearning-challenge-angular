import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import './rxjs-operators';

import { AuthService } from './auth.service';
import { LocalStorageService } from 'angular-2-local-storage';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  isAuth: boolean = false;
  isTeacher: boolean = false;
  actualUserId;

  constructor(private el:ElementRef, private authService: AuthService) {
    this.isAuth = this.authService.isAuthenticated;
    this.isTeacher = this.authService.isTeacher;

    let userRole = this.authService.infoUser();
    userRole.then((res) => {
      if (res.isTeacher == 1){
        this.isTeacher = true;
        console.log('Tu es un Teacher !!');
      }
      this.actualUserId = res.idUser;
    });
  }

  ngOnInit() {
  }

}