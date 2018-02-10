import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

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
    public vcr: ViewContainerRef,
    public toastr: ToastsManager,
    private snackbar: MatSnackBar
  ) {

      this.toastr.setRootViewContainerRef(vcr);

  }


  ngOnInit() {
  }



  showError() {
    this.toastr.error('Username and/or password incorrect.');
  }



  showSuccess() {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'right';
    config.verticalPosition = 'top';
    this.snackbar.open("Success!", "OK", config);
  }

  login() {
    this.session.login(this.user)
      .subscribe(result => {
        if (result === true) {
          //login successful
          // this.router.navigate(['/']);
          this.showSuccess();

        } else {
          //login failed
          this.showError();
          console.log('result not ok', result)
        }
      });
  }



}
