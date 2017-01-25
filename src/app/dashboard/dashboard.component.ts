import { Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

declare var jQuery: any;
declare var bootstrap: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  constructor(private router: Router, private auth: AuthService, private el:ElementRef) { }

  ngAfterViewInit() {
        
    return jQuery(".starrr").starrr();

	 // jQuery("#stars").on('starrr:change', function(e, value){
     // jQuery('#count').html(value);
    // q});
    
   // jQuery('#stars-existing').on('starrr:change', function(e, value){
    //  jQuery('#count-existing').html(value);
   // });

    }
}

