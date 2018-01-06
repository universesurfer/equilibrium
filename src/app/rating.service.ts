import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RatingService {

  constructor(
    private router: Router,
    private http: Http
  ) { }

}
