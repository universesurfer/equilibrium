import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(
    private session: AuthService,
    private router: Router
  ) {}


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
