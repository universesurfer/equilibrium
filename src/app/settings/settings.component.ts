// TODO: Implement CanActivate

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isAuth: boolean
  id: string;

  constructor(
    private session: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.session.isAuth
      .subscribe((isAuth: boolean) => this.isAuth = isAuth);


      if (this.session.token) {
       this.isAuth = true;
     } else {
       this.isAuth = false;
       this.router.navigate(['/']);
     }

   }




  ngOnInit() {
  }





}
