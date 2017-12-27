import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
