import { Component, OnInit } from '@angular/core';
import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from "angular-star-rating/star-rating-struct";
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-men-apparel',
  templateUrl: './men-apparel.component.html',
  styleUrls: ['./men-apparel.component.css']
})
export class MenApparelComponent implements OnInit {

onRatingChangeResult: OnRatingChangeEven;
companyName: string;
user: any;
category: string = "men-apparel";

rating: number;


  constructor(
    private session: AuthService,
    private router: Router
  ) {

    this.user = localStorage.getItem('user');

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log("getting current user", this.user);


    //Retrieve all companies within this category from Mongo
    this.getCompaniesForCategory();
  }

  //Detect any star rating changes and update the rating variable
  onRatingChange = ($event: OnRatingChangeEven) => {
        console.log('onRatingUpdated $event: ', $event);
        this.onRatingChangeResult = $event;

        this.rating = $event.rating
        console.log(this.rating);
    };


navigateToCompanyPage(company) {
  this.companyName = company.id;
  this.router.navigate([`/${this.category}/${this.companyName}`]);
}


//Returns the company id name and submits and saves company and user rating to signed in user to node
makeRating(company) {
  this.companyName = company.id;
  console.log(this.companyName);

  this.user.ratings.push({
    company: this.companyName,
    rating: this.rating
  });
  this.session.makeRating(this.category, this.user, this.rating)
  .subscribe(result => {
    if (result) {
      console.log("checking out user in makeRating()", this.user);
      console.log("inside the result in makeRating()", result);
    } else {
      console.log("Something went wrong when setting company rating.");
    }
  });
}


getCompaniesForCategory() {
  this.session.getCompanies(this.category)
  .subscribe(result => {
    if (result) {
      // result.user.aboutText = this.aboutText;
      console.log("inside the result in getCompaniesForCategory()", result);

    } else {
      console.log("Unable to retrieve companies...");
    }
  });
}






}
