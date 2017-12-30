import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  newUser = {
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
      .subscribe((isAuth:boolean) => this.isAuth = isAuth );

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


signup() {
  this.session.signup(this.newUser)
  .subscribe(result => {
    if (result === true) {
      console.log('result ok', result);
      console.log(this.newUser);
      this.router.navigate(['/']);
    } else {
      console.log('result not ok', result);
    }
  });
}



}
