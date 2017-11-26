import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

import { User } from "../shared/user";

@Injectable()

export class AuthService {

  BASE_URL=' http://localhost:8000';

  constructor(private http:Http, private router:Router) { }

  register(user:User){			
  let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	let body = JSON.stringify(user);
	return this.http.post(this.BASE_URL+'/api/register/', body, options).map((response: Response) => response.json());
  }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
    }
  }
  
  //jwt is stored in local storage for a successful login
  login(user:User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.post(this.BASE_URL+'/api/login', body, options)
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["/login"]);
  }
}


	