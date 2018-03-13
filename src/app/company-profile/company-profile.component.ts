import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../auth.service';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from "angular-star-rating/star-rating-struct";
import * as _ from 'underscore';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {


  isAuth: boolean;
  user: any;

  onRatingChangeResult: OnRatingChangeEven;

  editCheck: boolean = false;
  companies: any;

  params: any;
  category: string;
  companyName: string;
  company: any;
  allReviews: any
  deletedReviewId: any;

  //Empty data type placeholder.  Values for corresponding review properties are set in onRatingChange and displayCompanyInfo() in ngOnInit
  //Avoiding async issue
  rating: number;

  //Saves id's from reviews on company page
  reviewIds: Array<String> = [];
  userReviews: Array<String> = [];

  //Review checker
  reviewExists: boolean = false;
  intersectedId: any;


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
      .subscribe((isAuth: boolean) => this.isAuth = isAuth);

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
    if (this.isAuth === true) {
      this.review.createdBy = this.user._id;
    }


    console.log(this.session.companies);
    this.companies = this.session.companies;

    this.displayCompanyInfo(this.params.category, this.params.company); //Call and display the company data when page loads.
    this.getAllReviews(); //Retrieve reviews and block new review if user has reviewed.


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

  // getPublicProfileOfUser(id) {
  //   this.session.getPublicProfile(id) {
  //     .subscribe(result => {
  //       if (result) {
  //         console.log("getting the result of getPublicProfile()", result);
  //       } else {
  //         console.log("Was not able to retrieve public user profile.");
  //       }
  //     })
  //   }
  // }

  setDeletedReviewId(id) {
    this.deletedReviewId = id;
  }

  removeItem(id) {
    this.allReviews = this.allReviews.filter(review => review._id !== id);
}

  editReview() {
    if (this.editCheck != true) {
      this.editCheck = true;
    }

  }

  setProfileIdAndNavigate(id) {
    this.session.publicProfileId = id;
    this.router.navigate([`/profile/${id}`]);
  }

  //Checks if user has reviewed company already.  If so, hide review form.
  checkIfUserHasAlreadyReviewed() {

    if (this.allReviews !== null && this.user !== null) {

      this.allReviews.forEach(object => {
        this.reviewIds.push(object._id);
        console.log(this.reviewIds);
      });

      this.user.reviews.forEach(review => {
        this.userReviews.push(review);
        console.log("showing all user reviews", this.userReviews);
      });

      this.checkForIntersection(this.reviewIds, this.userReviews);

    }

  }

  //Checks company reviews and user reviews for matches.
  checkForIntersection(array1, array2) {
    var intersection = _.intersection(array1, array2);


    if (intersection.length != 0) {
      console.log("intersection exists");
      this.intersectedId = intersection;
      this.reviewExists = true;
      console.log(this.reviewExists);
      return true;
    } else {
      console.log("intersection doesn't exist");
      return false;
    }
  }


  //Submit the user review
  submitUserReview() {
    this.session.makeReview(this.category, this.companyName, this.review)
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

  deleteReview() {
    this.session.deleteReview(this.category, this.companyName, this.deletedReviewId, this.user._id)
      .subscribe(result => {
        if (result) {
          console.log("Inside deleteReview() function in company profile component", result);
          return true;
        } else {
          console.log("Unable to see deleteReview() value in companyProfile", result);
          return false;
        }
      });
  };


  //Get all reviews for the company
  getAllReviews() {
    this.session.getAllReviewsForCompany(this.category, this.companyName)
      .subscribe(result => {
        if (result) {
          this.allReviews = result.reviews;
          this.checkIfUserHasAlreadyReviewed();
          console.log("Retrieving reviews in allReviews", this.allReviews);
          // this.checkIfUserHasAlreadyReviewed();
          return true;
        } else {
          console.log("Unable to retrieve reviews.");
          return false;
        }
      })
  }


}
