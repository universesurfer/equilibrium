import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  BASE_URL: string = 'http://localhost:3000';

  editCheck: boolean = false;

  currentUser = Object;
  user: any;


  paramsId: string;
  isAuth: boolean;
  aboutText: string;
  id: string;
  avatar: string = '/assets/glyphicons/user.png';

  //Set uploader variable as new FileUploader data type
  uploader: FileUploader; //

  publicProfileId: string;



  constructor(
    private session: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    //Set public profile id to same id set in session.
    this.publicProfileId = this.session.publicProfileId;

    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth);


    this.user = localStorage.getItem('user');


    //If the localStorage id matches the id in the url parameter, display buttons and allow user to edit bio.
    if (this.id === this.paramsId) {
      this.isAuth = true;
      console.log("id's are equal.  Is auth should be working.")
    } else {
      this.isAuth = false;
      console.log("something is wrong with isAuth");
    }

  }



  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getUserDetails(params['id']);

      this.user = JSON.parse(localStorage.getItem('user'));
      console.log("here's the current user", this.user);
      console.log(this.aboutText);
      //Get the url id params to check against localStorage in constructor above.
      this.id = localStorage.getItem('id');
      console.log("user id", this.id);
      this.paramsId = params['id'];
      console.log("in params id", this.paramsId);

    });

    //Setting the url for uploader
    this.uploader = new FileUploader({
      url: `${this.BASE_URL}/profile/${this.id}`
    });


    this.uploader.onSuccessItem = (item, response) => {

      this.session.get(this.paramsId)
        .subscribe((response) => {
          this.user = response.user;
          console.log("in success response, showing the item", item );
        });
    };

    //Retrieve public profile user details
    this.getPublicProfileOfUser();
  }



  //Upload new image
  saveAvatar() {
    this.uploader.uploadAll();
  }


  // edit() {
  //   this.editCheck = true;
  // }



// NOTE: Set up the get user route in users.js

  getUserDetails(id) {
    this.session.get(id)
      .subscribe((returnedUser) => {
        this.user = returnedUser;
        console.log("showing returnedUser in getUserDetails()", returnedUser);
        // NOTE: complete user route to successfully get and update user from this component
                  //Include in get or in PUT
      });
  }

// NOTE: EVENT EMITTER NEEDED TO SEND USER ID FROM review TO METHOD TO RETRIEVE CORRECT DETAILS?
getPublicProfileOfUser() {
  this.session.getPublicProfile(this.publicProfileId)
    .subscribe(result => {
      if (result) {
        this.user = result.user;
        console.log("getting the result of getPublicProfile()", result);
      } else {
        console.log("Was not able to retrieve public user profile.");
      }
    })
}


  updatePicture() {
    this.session.editPicture(this.user)
      .subscribe(result => {
        if (result) {
          console.log("getting the result of updatePicture()", result);
        } else {
          console.log("Was not able to update picture at this time.");
        }
      })
  }


  updateProfile() {
    this.session.edit(this.user)
      .subscribe(result => {
        if (result) {
          // result.user.aboutText = this.aboutText;
          console.log("inside the result in updateProfile()", result);
          // this.user.aboutText = this.aboutText;
          console.log("here's the user", this.user);
          console.log("does it have about text?", this.aboutText);
        } else {
          console.log("Something went wrong when editing profile.");
        }
      });
  }



}
