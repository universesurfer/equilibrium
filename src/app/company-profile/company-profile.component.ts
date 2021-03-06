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
  currentUser: any;
  id: string;

  onRatingChangeResult: OnRatingChangeEven; //Detects star rating changes

  editCheck: boolean = false;

  params: any;
  category: string;
  companyName: string;
  company: any;
  allReviews: any
  deletedReviewId: any; //Holds deleted review id for delete request

  //Empty data type placeholder.  Values for corresponding review properties are set in onRatingChange and displayCompanyInfo() in ngOnInit
  //Avoiding async issue
  rating: number;
  averageRating: number;

  //Saves id's from reviews on company page
  reviewIds: Array<String> = [];
  userReviews: Array<String> = [];

  //Review checker
  reviewExists: boolean = false;
  intersectedId: any; //Holds any review saved to both company and current user


  //Hold review data from form to send to Mongo
  review = {
    starRating: this.rating, //placeholder to hold a number value
    commentBody: '',
    createdBy: '',
    originalId: ''
  };

  newReview: any; //Holds the new review to immediately display to DOM
  localStoragePicture: any; //Temporary display of new image


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

    //Get current user info and picture
    this.user = JSON.parse(localStorage.getItem('user'));
    this.localStoragePicture = localStorage.getItem('picture');
    this.id = localStorage.getItem('id');


    //Get logged in user details from Mongo.
    this.getUserDetails(this.id);

    // console.log("showing user in company profile", this.user)

    //Set the user id to the user property in review model to make sure it's available when page loads and saves to review.
    if (this.isAuth === true) {
      this.review.createdBy = this.user._id;
      // this.editedReview.createdBy = this.user._id;
    }

    //Call and display the company data when page loads.
    this.displayCompanyInfo(this.params.category, this.params.company);

    //Retrieve reviews and block new review if user has reviewed.
    this.getAllReviews();
  }


  //Detect any star rating changes and update the rating variable
  onRatingChange = ($event: OnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    // this.onRatingChangeResult = $event;

    //Save any star rating changes to review object
    this.review.starRating = $event.rating;

  };



  //Retrieve relevant company information for each separate company
  displayCompanyInfo(category, companyName) {
    this.session.getSingleCompany(category, companyName)
      .subscribe(result => {
        if (result) {
          this.company = result.company
          // console.log("inside the result in displayCompanyInfo()", this.company);
          // console.log("getting entire result in displayCompanyInfo()", result);

        } else {
          console.log("Unable to retrieve this company's information with displayCompanyInfo()");
        }
      });
  }


  //Grab id of user deleted review.
  setDeletedReviewId(id) {
    this.deletedReviewId = id;
  }

  //Remove the delete review from allReviews array and from dom.
  removeItem(id) {
    this.allReviews = this.allReviews.filter(review => review._id !== id);
  }

  //Immediately show new review on dom.  Called in submitUserReview() below.
  addReviewToDom() {
    this.allReviews.push(this.newReview);
  }

  //Edit the existing review.
  editReview() {
    if (this.editCheck != true) {
      this.editCheck = true;
    }
  }

  //Binds the edited comment to review with an event listener
  editComment(val: string) {
    this.review.commentBody = val;
  }

  getUserDetails(id) {
    this.session.get(id)
      .subscribe((returnedUser) => {
        this.currentUser = returnedUser.user;
        // console.log("showing returnedUser in getUserDetails()in company profile component", returnedUser.user);
      });
  }


  //Checks if user has reviewed company already.  If so, hide review form.
  checkIfUserHasAlreadyReviewed() {

    if (this.allReviews !== null && this.user !== null || undefined) {

      this.allReviews.forEach(object => {
        this.reviewIds.push(object._id);
        console.log(this.reviewIds);
      });

      this.currentUser.reviews.forEach(review => {
        this.userReviews.push(review);
        // console.log("showing all user reviews", this.userReviews);
      });

      this.checkForIntersection(this.reviewIds, this.userReviews);

    }
  }

  //Returns the average rating for company from all reviews.
  getAverageCompanyRating() {
    var sumOfRatings;
    var ratingArray = [];

    this.allReviews.forEach(object => {
      ratingArray.push(object.starRating);
      sumOfRatings = ratingArray.reduce((a, b) => a + b, 0); //Returns sum of all ratings

      this.averageRating = sumOfRatings / ratingArray.length;
    });
  }


  //Checks company reviews and user reviews for matches.  If there is a match, don't show review form.
  checkForIntersection(array1, array2) {
    var intersection = _.intersection(array1, array2);

    if (intersection.length != 0) {
      // console.log("intersection exists");
      this.intersectedId = intersection;
      this.reviewExists = true;
      console.log(this.reviewExists);
      return true;
    } else {
      // console.log("intersection doesn't exist");
      return false;
    }
  }


  hideReviewForm() {
    var reviewForm = document.getElementById("review-form");
    reviewForm.style.display = "none";
  }

  showReviewForm() {
    var reviewForm = document.getElementById("review-form");
    reviewForm.style.display = "block";
  }

  //Submit and save the user review to Mongo.
  submitUserReview() {
    this.session.makeReview(this.category, this.companyName, this.review)
      .subscribe(result => {
        if (result) {

          // console.log("Review submitted from submitUserReview()", result);
          this.newReview = result.review;
          // console.log("showing newReview", this.newReview);
          this.addReviewToDom();
          return true;
        } else {
          // console.log("Unable to submit review from submitUserReview()", result);
          return false;
        };
      });
  }

  editUserReview(thisReviewId) {
    this.review.originalId = thisReviewId;
    // console.log("showing review in component", this.review);
    this.session.editReview(this.category, this.companyName, this.review)
      .subscribe(result => {
        if (result) {
          // console.log("Edited review submitted from editUserReview()", result);
          this.editCheck = false;
          return true;
        } else {
          // console.log("Unable to edit review from editUserReview()", result);
          return false;
        }
      });
  }

  //Delete the review from Mongo.
  deleteReview() {
    this.session.deleteReview(this.category, this.companyName, this.deletedReviewId, this.user._id)
      .subscribe(result => {
        if (result) {
          // console.log("Inside deleteReview() function in company profile component", result);
          return true;
        } else {
          // console.log("Unable to see deleteReview() value in companyProfile", result);
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
          this.getAverageCompanyRating();
          console.log("Retrieving reviews in allReviews", this.allReviews);
          // this.checkIfUserHasAlreadyReviewed();
          return true;
        } else {
          // console.log("Unable to retrieve reviews.");
          return false;
        }
      })
  }


}
