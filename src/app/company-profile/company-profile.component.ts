import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../auth.service';
import { AsyncPipe } from '@angular/common';
import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from "angular-star-rating/star-rating-struct";


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {


isAuth: boolean;
user: any;

onRatingChangeResult: OnRatingChangeEven;
rating: number; //placeholder to hold a number value in review model

companies: any;

params: any;
category: string;
companyName: string;
company: any;


//Hold review data from form to send to Mongo
review = {
  starRating: this.rating, //placeholder to hold a number value
  subject: '',
  commentBody: '',
  userId: ''
};

  constructor(
    private session: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    //User Authorization check
    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth );

    //if token exists, authenticated
    if (localStorage.getItem('token')) {
      this.isAuth = true;
    //if not, not authenticated
    } else {
      this.isAuth = false;
    }


    //Set global variables with params for use in displayCompanyInfo() method below
    this.params = this.activatedRoute.snapshot.params;
    this.category = this.activatedRoute.snapshot.params.category;
    this.companyName = this.activatedRoute.snapshot.params.company;

   }


  ngOnInit() {

    //Get current user
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("getting current user", this.user);

    //Set the user id to the user property in review model to make sure it's available when page loads
    this.review.userId = this.user._id;

    console.log(this.session.companies);
    this.companies = this.session.companies;

    //Display the company data when page loads.
    this.displayCompanyInfo(this.params.category, this.params.company);

}


// starRating = new FormGroup({
//         myRatingControl: new FormControl('')
//     });


//Detect any star rating changes and update the rating variable
onRatingChange = ($event: OnRatingChangeEven) => {
      console.log('onRatingUpdated $event: ', $event);
      // this.onRatingChangeResult = $event;


      //Save any star rating changes to review object
      this.review.starRating = $event.rating;
  };




//Retrieves relevant company information for each separate company
displayCompanyInfo(category, companyName) {
  this.session.getSingleCompany(category, companyName)
    .subscribe(result => {
      if (result) {
        this.company = result
        console.log("inside the result in displayCompanyInfo()", this.company);
      } else {
        console.log("Unable to retrieve this company's information with displayCompanyInfo()");
      }
    });
}


//Submit the user review
// NOTE: currently without rating until I know it works
submitUserReview() {
  this.session.makeReview(this.category, this.companyName, this.review )
  .subscribe(result => {
    if (result) {
      console.log("Review submitted from submitUserReview()", result);
      return true;
    } else {
      console.log("Unable to submit review from submitUserReview()", result);
      return false;
  };
});
}


}
