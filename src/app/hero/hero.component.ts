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

  constructor(
    private session: AuthService,
    private router: Router
  ) {
    //checks isAuth event emitter in login to see if it's true.  If it is, subscribe the result to our local isAuth variable
    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth );

    //if token exists, authenticated
    if (this.session.token) {
      this.isAuth = true;
    //if not, not authenticated
    } else {
      this.isAuth = false;
    }
  }

  ngOnInit() {
  }

}
