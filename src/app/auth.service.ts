import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

public token: string;
isAuth: EventEmitter<any> = new EventEmitter();
id: string;

//404 disappears when http removed.  Brings up cors issue
//Users seem to save to Mongo as long there's no internet connection.  Getting '400 (Bad Request) even though it saves.'

BASE_URL: string = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) {}

isAuthenticated() {
  return this.token != null ? true : false;
}


//CanActivate method for our profile page route guard.
//This method persists user login between page refreshes.

// canActivate(): Observable<boolean> | Promise<boolean> | boolean {
//   if (localStorage.getItem('token')) {
//     //logged in, so return true
//     // this.isAuth.emit(true);
//     return true;
//   } else {
//     //not logged in, so redirect to home page
//     this.router.navigate(['/']);
//     this.isAuth.emit(true);
//     return false;
//   }
// }


retrieveIdThenNavigate() {
  this.id = localStorage.getItem('id');
  return this.http.get(`${this.BASE_URL}/profile/${this.id}`)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
}



//This function signs up our user
signup(user) {
  return this.http.post(`${this.BASE_URL}/signup`, user)
    .map((response) => {
      console.log(response, response.json())
      let token = response.json() && response.json().token;
      let user = response.json().user;

      if(token) {
        this.token = token;
        //store username and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.isAuth.emit(true);

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

localStorageTimeout() {
    setTimeout(function(){ localStorage.clear(); }, (60 * 60 * 1000)); // 24 hours
}

login(user) {
  return this.http.post(`${this.BASE_URL}/login`, user)
    .map((response) => {
      let token = response.json() && response.json().token;
      // let currentUser = response.json().user;
      let currentUser = JSON.stringify(response.json().user);

      if(token) {
        //set token property
        this.token = token;

        this.isAuth.emit(true);

        //store username and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        localStorage.setItem('user', currentUser);


        return true; //return true to indicate successful login
      } else {
        return false;
    }
    })
    .catch((err) => {
      return Observable.throw(err);
    });
}


logout() {
  //clear token to remove user from local storage and log them out
  this.token = null;
  this.isAuth.emit(false);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/']);
}

}
