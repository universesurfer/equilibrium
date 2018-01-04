import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;
  user: any;

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
    //if not, not authenticated
    } else {
      this.isAuth = false;
    }
  }

  ngOnInit() {
    //Provides the user id for goToProfile() below
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  goToProfile() {
    this.router.navigateByUrl(`/profile/${this.user._id}`);
  }

}
