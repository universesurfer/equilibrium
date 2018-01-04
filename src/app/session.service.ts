import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate} from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SessionService  {

  isAuth: EventEmitter<any> = new EventEmitter();
  BASE_URL: string = 'http://localhost:3000';
  id: string;


  constructor(
    private router: Router,
    private http: Http
  ) {}







}
