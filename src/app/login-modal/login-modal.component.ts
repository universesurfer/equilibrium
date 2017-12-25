import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
