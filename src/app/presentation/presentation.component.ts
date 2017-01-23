import { Component, OnInit, ElementRef } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  constructor(private el:ElementRef) { }

  ngOnInit() {
  }

}
