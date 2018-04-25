import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';


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

  constructor(
    private session: AuthService,
    private router: Router,
    public vcr: ViewContainerRef
  ) {}


  ngOnInit() {
  }


  login() {
    this.session.login(this.user)
      .subscribe(result => {
          //login successful
          this.router.navigate(['/']);
          this.session.showSuccess();
      }, error => {
          //login failed
          this.session.showError();
      });
}




}
