import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Book} from '../shared/book';

@Injectable()
export class BookService {

  Google_URL="https://www.googleapis.com/books/v1/volumes?q=";

  constructor(private http:Http) { }

  search(term: string): Observable<Book[]>{
    return this.http
               .get('https://www.googleapis.com/books/v1/volumes?q='+term)
               .map(response => response.json().items);
  } 
} 