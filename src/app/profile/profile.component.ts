import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser = Object;
  user: any;
  paramsId: string;
  isAuth: boolean;

  constructor(
    private session: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth );

      //If the localStorage id matches the id in the url parameter, display buttons and allow user to edit bio.
      this.user = localStorage.getItem('user');
      console.log("user id", this.user._id);

      if(this.user._id === this.paramsId) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }

  }



  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getUserDetails(params['id']);
    });

  }


// getUserDetails(id) {
//
//     this.activatedRoute.params.subscribe(params => {
//       this.getUserDetails(params['id']);
//     })

  // this.session.retrieveIdThenNavigate()
  //   .subscribe((response) => {
  //     this.user = response.user;
  //   })
// }

getUserDetails(id) {
  this.session.get(id)
  .subscribe((returnedUser) => {
    this.currentUser = returnedUser;
  })
}





}
