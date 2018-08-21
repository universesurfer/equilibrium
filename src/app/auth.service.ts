import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';



@Injectable()
export class AuthService implements CanActivate {

public token: string;
isAuth: EventEmitter<any> = new EventEmitter();
id: string;
public companies: any;

publicProfileId: string;

imagePreviewUrl: any = "/assets/glyphicons/user.png";

BASE_URL: string = 'http://localhost:3000';
// BASE_URL: string = 'http://ethos-app.herokuapp.com';

  constructor(
    private router: Router,
    private http: Http,
    private toastr: ToastrService
  ) {}


isAuthenticated() {
  return this.token != null ? true : false;
}

//CanActivate method for our profile page route guard.
//This method persists user login between page refreshes.
canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (localStorage.getItem('token')) {
    //logged in, so return true
    this.isAuth.emit(true);
    return true;
  } else {
    //not logged in, so redirect to home page
    this.router.navigate(['/']);
    this.isAuth.emit(true);
    return false;
  }
}

//Toastr Notification
showError() {
  this.toastr.error('Username and/or password incorrect.');
}

//Toastr Notification
showSuccess() {
  this.toastr.success('Success!');
}


//Sign up new user
signup(user) {
  return this.http.post(`${this.BASE_URL}/signup`, user)
    .map((response) => {
      console.log(response, response.json())
      let token = response.json() && response.json().token;
      let user = JSON.stringify(response.json().user);

      if(token) {
        this.token = token;
        //store username and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('id', response.json().user._id);

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
    setTimeout(function(){ localStorage.clear(); }, (10));
}

//Login the user
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
          //Set token property
          this.token = token;


          //Store username and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token);
          localStorage.setItem('user', currentUser);
          localStorage.setItem('id', response.json().user._id);

          //Provides user's picture to display on submitted review.  Wrap it conditionally in case pic doesn't exist yet.
          if (response.json().user.image.path != null) {
            localStorage.setItem('picture', response.json().user.image.path);
          }

          this.isAuth.emit(true);
          console.log("getting local storage id", response.json().user._id);

          // this.localStorageTimeout(); //set a timeOut for logged in user

          //return true to indicate successful login
          return true;
        } else {
          return false;
      }
      })
      .catch((err) => {
        return Observable.throw(err);
      });
  }

//Logout the user
  logout() {
    //clear token to remove user from local storage and log them out
    this.token = null;
    this.isAuth.emit(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('picture');
    localStorage.removeItem('id');
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

//Edit user picture
  editPicture(user) {
    this.id = localStorage.getItem('id');
    return this.http.post(`${this.BASE_URL}/profile/${this.id}`, user)
      .map((res) => res.json())
      .catch((err) => {
        return Observable.throw(err);
      });
  }



//Make a review
  makeReview(category, companyName, review) {
    return this.http.post(`${this.BASE_URL}/${category}/${companyName}`, review )
      .map((res) => res.json())
      .catch((err) => {
        return Observable.throw(err);
      });
  }

//Edit a review
  editReview(category, companyName, review) {
    return this.http.put(`${this.BASE_URL}/${category}/${companyName}`, review)
    .map((res) => res.json())
    .catch((err) => {
      return Observable.throw(err);
    });
  }

//Delete a review
  deleteReview(category, companyName, review, user) {
    return this.http.delete(`${this.BASE_URL}/${category}/${companyName}/${review}/${user}`)
      .map((res) => res.json())
      .catch((err) => {
        return Observable.throw(err);
      });
  }

//Retrieve all reviews for a company
  getAllReviewsForCompany(category, companyName) {
    return this.http.get(`${this.BASE_URL}/${category}/${companyName}`)
      .map((res) => res.json())
      .catch((err) => {
        return Observable.throw(err);
      });
  }



get(id) {
  this.id = localStorage.getItem('id');
  let headers = new Headers({
    'Authorization': 'JWT' + this.token,
    'Content-Type': "application/json"
    });
  let options = new RequestOptions({ headers: headers });
  return this.http.get(`${this.BASE_URL}/profile/${this.id}`, options)
    .map((res) => res.json());
}



// var headers = new Headers({
//     "Content-Type": "application/json",
//     "Accept": "application/json"
// });

// getPublicProfile(id) {
//   var userId = id;
//   return this.http.get(`${this.BASE_URL}/profile/${userId}`)
//     .map((res) => res.json())
//     .catch((err) => {
//       return Observable.throw(err);
//     })
// }


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
