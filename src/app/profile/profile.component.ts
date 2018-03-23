

// TODO: Implement CanActivate


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

  currentUser = Object; //holds user details from getUserDetails()
  user: any;  //holds user data from localStorage


  paramsId: string;
  isAuth: boolean;
  aboutText: string;
  id: string;
  avatar: string = '/assets/glyphicons/user.png';

  //Set uploader variable as new FileUploader data type
  uploader: FileUploader; //

  //Holds avatar.  Displays user image preview on page before multer upload.
  imagePreviewUrl: any = "/assets/glyphicons/user.png";



  constructor(
    private session: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth);


    this.user = localStorage.getItem('user');


    //If the localStorage id matches the id in the url parameter, display buttons and allow user to edit bio.
    if (this.id === this.paramsId) {
      this.isAuth = true;
      console.log("id's are equal.  Is auth should be working.")
    } else {
      this.isAuth = false;
      this.router.navigate(['/']);
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
      this.session.get(this.id)
        .subscribe((response) => {
          this.user = response.user;
          console.log("showing the response in onSuccessItem", response);
          console.log("in success response, showing the item", item );
        });
    };


  }



  //Upload new image
  saveAvatar() {
    this.uploader.uploadAll();
  }


  //Reads the user image to immediately display a preview of the file.
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.imagePreviewUrl = event.target.result;
        this.session.imagePreviewUrl = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }






  // edit() {
  //   this.editCheck = true;
  // }



  getUserDetails(id) {
    this.session.get(id)
      .subscribe((returnedUser) => {
        this.currentUser = returnedUser.user;
        console.log("showing returnedUser in getUserDetails()", returnedUser.user);
        // NOTE: complete user route to successfully get and update user from this component
                  //Include in get or in PUT
      });
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
    this.session.edit(this.currentUser)
      .subscribe(result => {
        if (result) {
          // result.user.aboutText = this.aboutText;
          console.log("inside the result in updateProfile()", result);
          // this.user.aboutText = this.aboutText;
          console.log("here's the user", this.currentUser);
          // console.log("does it have about text?", this.currentUser.aboutText);
        } else {
          console.log("Something went wrong when editing profile.");
        }
      });
  }



}
