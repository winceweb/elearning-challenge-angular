import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destroy',
  templateUrl: './destroy.component.html',
  styleUrls: ['./destroy.component.css']
})
export class DestroyComponent implements OnInit {

	constructor(private router:Router) {
	
	}

  ngOnInit() {
  	this.router.navigate(['/login']);
  }

}
