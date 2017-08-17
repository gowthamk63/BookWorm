import { Component, OnInit } from '@angular/core';

import {BookService} from '../shared/book.service'
import {Book} from '../shared/book';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  books: Observable<Book[]>;

  private searchTerms = new Subject<string>();

  constructor(private bookservice:BookService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.books = this.searchTerms
      .debounceTime(300)        
      .distinctUntilChanged()  
      .switchMap(term => term   
        ? this.bookservice.search(term)
        : Observable.of<Book[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Book[]>([]);
      });

  }  
}

