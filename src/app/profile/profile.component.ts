import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  id: string;

  constructor(
    private session: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   this.getUserDetails(params['id']);
    // });
    //
    // this.id = localStorage.getItem('id');

  }


getUserDetails(id) {
  this.session.retrieveIdThenNavigate()
    .subscribe((response) => {
      this.user = response.user;
    })
}






}
