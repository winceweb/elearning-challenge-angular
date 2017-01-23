import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problematic',
  templateUrl: './problematic.component.html',
  styleUrls: ['./problematic.component.css']
})
export class ProblematicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gotoDetail(problematic: Problematic): void {
    this.router.navigate(['/problematic', problematic.idProblematic]);
  }

}
