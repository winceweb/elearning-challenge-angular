import { Component, OnInit, ElementRef } from '@angular/core';
import './rxjs-operators';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  constructor(private el:ElementRef) { }

  ngOnInit() {
  }

}

