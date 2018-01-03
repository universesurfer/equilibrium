import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  isAuth: boolean;
  user: any;

  constructor(
    private session: AuthService,
    private router: Router
  ) {
    //checks isAuth event emitter in login to see if it's true.  If it is, subscribe the result to our local isAuth variable
    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth );

    // if token exists, authenticated
    if (localStorage.getItem('token')) {
      this.isAuth = true;
      localStorage.getItem('token');
      localStorage.getItem('user');
    //if not, not authenticated
    } else {
      this.isAuth = false;
    }

  }

  ngOnInit() {

}

  //Call the logout function from out auth service.
  logout() {
    this.session.logout()
}

}
