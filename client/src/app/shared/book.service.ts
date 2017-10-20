import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {Book} from './book';

@Injectable()
export class BookService {
  private BASE_URL=' http://localhost:8000/api/books/';

  constructor(private http:Http) { }

  getBooks(){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': "JWT "+JSON.parse(localStorage.getItem('currentUser')).token});
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.BASE_URL,options).map((response: Response) => response.json());
  }

  addBook(book: Book){		
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': "JWT "+JSON.parse(localStorage.getItem('currentUser')).token});
      let options = new RequestOptions({ headers: headers });
      let body = {book_id: book.id};
      return this.http.post(this.BASE_URL, body, options).map((response: Response) => response.json()).subscribe();
  }
}
