import { Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

declare var $: any;
declare var bootstrap: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private el:ElementRef) { }

  ngOnInit() {

  }

}
