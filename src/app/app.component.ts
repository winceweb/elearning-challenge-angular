import { Component } from '@angular/core';
import { Router } from '@angular/router';
import './rxjs-operators';


import { AuthService } from './auth.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  altImg = 'Teach&Learn';
}