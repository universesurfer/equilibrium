import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    if (localStorage.getItem('token')) {
      //logged in, so return true
      // this.isAuth.emit(true);
      return true;
  } else {
    return false;
  }

}

}
