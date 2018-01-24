import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate {

public token: string;
isAuth: EventEmitter<any> = new EventEmitter();
id: string;
public companies: any;


// public singleCompany: any;

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
canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (localStorage.getItem('token')) {
    //logged in, so return true
    // this.isAuth.emit(true);
    return true;
  } else {
    //not logged in, so redirect to home page
    this.router.navigate(['/']);
    this.isAuth.emit(true);
    return false;
  }
}


// retrieveIdThenNavigate() {
//   this.id = localStorage.getItem('id');
//   return this.http.get(`${this.BASE_URL}/profile/${this.id}`)
//     .map((res) => res.json())
//     .catch((err) => {
//       return Observable.throw(err);
//     });
// }
//


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
    // setTimeout(function(){ localStorage.clear(); }, (60 * 60 * 1000));  // 24 hours
    setTimeout(function(){ localStorage.clear(); }, (10));
}

login(user) {
  return this.http.post(`${this.BASE_URL}/login`, user)
    .map((response) => {
      console.log("here's the response", response);
      console.log("here's the token", response.json());
      let token = response.json() && response.json().token;
      // let currentUser = response.json().user;
      let currentUser = JSON.stringify(response.json().user);

      if(token) {
        console.log("here's the token", token);
        //set token property
        this.token = token;

        this.isAuth.emit(true);

        //store username and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        localStorage.setItem('user', currentUser);
        localStorage.setItem('id', response.json().user._id);
        console.log("getting local storage id", response.json().user._id);

        // this.localStorageTimeout();

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


edit(user) {
  this.id = localStorage.getItem('id');
  return this.http.put(`${this.BASE_URL}/profile/${this.id}`, user)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
}

editPicture(user) {
  this.id = localStorage.getItem('id');
  return this.http.post(`${this.BASE_URL}/profile/${this.id}`, user)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
}

//Passes review object from company profile to server
makeReview(category, companyName, review ) {
  return this.http.post(`${this.BASE_URL}/${category}/${companyName}`, review )
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
}


get(id) {
  this.id = localStorage.getItem('id');
  let headers = new Headers({ 'Authorization': 'JWT' + this.token });
  let options = new RequestOptions({ headers: headers });
  return this.http.get(`${this.BASE_URL}/profile/${this.id}`, options)
    .map((res) => res.json());
}


getCompaniesForCategory(category) {
  return this.http.get(`${this.BASE_URL}/${category}`)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
}

getSingleCompany(category, company) {
  return this.http.get(`${this.BASE_URL}/${category}/${company}`)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
}








}
