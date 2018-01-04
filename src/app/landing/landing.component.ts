import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  user: any;
  isAuth: boolean;

  constructor(
    private session: AuthService,
    private router: Router
  ) {
    //checks isAuth event emitter in login to see if it's true.  If it is, subscribe the result to our local isAuth variable
    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth );

    //if token exists, authenticated
    if (localStorage.getItem('token')) {
      this.isAuth = true;
      localStorage.getItem('token');
      localStorage.getItem('user');
    //if not, not authenticated
    } else {
      this.isAuth = false;
    }

    this.user = JSON.parse(localStorage.getItem("user"));

  }


  ngOnInit() {

}

}
