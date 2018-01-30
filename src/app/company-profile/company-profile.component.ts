import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../auth.service';
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



companies: any;

params: any;
category: string;
companyName: string;
company: any;
allReviews: any;

//Empty data type placeholder.  Values for corresponding review properties are set in onRatingChange and displayCompanyInfo() in ngOnInit
//Avoiding async issue
rating: number;


//Hold review data from form to send to Mongo
review = {
  starRating: this.rating, //placeholder to hold a number value
  subject: '',
  commentBody: '',
  createdBy: ''
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
    this.review.createdBy = this.user._id;

    console.log(this.session.companies);
    this.companies = this.session.companies;

    //Call and display the company data when page loads.
    this.displayCompanyInfo(this.params.category, this.params.company);


}



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
        this.company = result.company

        console.log("inside the result in displayCompanyInfo()", this.company);
        console.log("getting entire result in displayCompanyInfo()", result);

      } else {
        console.log("Unable to retrieve this company's information with displayCompanyInfo()");
      }
    });
}


//Submit the user review
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


//Get all reviews for the company
getAllReviews() {
  this.session.getAllReviewsForCompany(this.category, this.companyName)
    .subscribe(result => {
      if (result) {
        console.log("Retrieving reviews");
        this.allReviews = result;
        return true;
      } else {
        console.log("Unable to retrieve reviews.");
        return false;
      }
    })
}


}
