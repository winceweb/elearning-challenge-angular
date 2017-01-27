import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
  username: '',
  password: ''
  };

  isTeacher: boolean = false;

  constructor(private router:Router, private auth: AuthService) {
    auth.loginInit();
  }

  ngOnInit() {
  }

  login(usercreds) {

     let userlogin = this.auth.login(usercreds);
     userlogin.then((res) => {
       if (res)
       this.router.navigate(['/lessons']);
     })
  }

}
