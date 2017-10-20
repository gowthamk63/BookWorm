import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BookService } from "../shared/book.service";
import {Book} from '../shared/book';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  books : Observable<Book[]>;

  constructor(private bookservice:BookService) { }

  ngOnInit() {
    this.books=this.bookservice.getBooks();
    console.log(this.books.subscribe(data=>data));
  }

}
