import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-main-page',
  templateUrl: './book-main-page.component.html',
  styleUrls: ['./book-main-page.component.scss']
})
export class BookMainPageComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.initalSearchParams();
    this.bookService.getBooks().subscribe(result => {
      console.log("Remote Search For Books", result);
    })
  }

}
