import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

public token: string;

BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) { }


//This function signs up our user
signup(user) {
  return this.http.post(`${this.BASE_URL}/signup`, user)
    .map((response) => response.json())
    .map((response) => {
      let token = response.json() && response.json().token;
      let user = response.json().user;

      if(token) {
        this.token = token;
        //store username and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // this.isAuth.emit(true);

        //return true to indicate successful login
        return true
      } else {
        //return false to indicate failed login
        return false
      }
    })
    .catch((err) => {
      return Observable.throw(err);
    });





}

}
