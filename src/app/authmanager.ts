import {Injectable} from '@angular/core';
import { AuthService } from './auth.service';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthManager implements CanActivate {

  isTeacher: boolean = false;

  constructor(private router: Router, private auth: AuthService) {

    this.isTeacher = this.auth.isTeacher;

    let userRole = this.auth.infoUser();
    userRole.then((res) => {
      if (res.isTeacher == 1){
        this.isTeacher = true;
      }
    });

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(next.url[0] != undefined){

      let dataRoute;
      dataRoute = next.data;
      if(dataRoute.roles != 'undefined'){
        if(dataRoute.roles == 'teacher' && this.isTeacher != true){
          console.log('!!!!!!You are not allowed to access this page!!!!!!');
          return false;
        }
      }

      if(next.url[0].path == 'login'){
        if(this.auth.isAuthenticated){
          console.log('You are already logged in...');
          return false;
        }
        else
        return true;
      }

    }

    if(this.auth.isAuthenticated)
    return true;

    console.log('!!!!!!You must be logged in!!!!!!');
    this.router.navigate(['/login']);
    return false;
  }


}
