import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  isAuth: boolean;
  user: any;
  token: any;

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
      localStorage.getItem('token');
      localStorage.getItem('user');
    //if not, not authenticated
    } else {
      this.isAuth = false;
    }


  }



  ngOnInit() {

    localStorage.getItem('token');
    localStorage.getItem('user');

  }

}
