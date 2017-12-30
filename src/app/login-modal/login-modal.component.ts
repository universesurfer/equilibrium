import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  //Hold user data from form to send to Mongo
  user = {
    email: '',
    password: ''
  };

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


  login() {
    this.session.login(this.user)
      .subscribe(result => {
        if (result === true) {
          //login successful
          this.router.navigate(['/']);
        } else {
          //login failed
          console.log('result not ok', result)
        }
      });
  }



}
