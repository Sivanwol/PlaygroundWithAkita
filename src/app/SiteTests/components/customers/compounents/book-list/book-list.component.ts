import { Component, OnInit, OnDestroy } from "@angular/core";
import { BookService } from "../../services/book.service";
import { Observable, Subject } from 'rxjs';
import { BookItem } from '../../models/book.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit , OnDestroy{
  public items$: Observable<Array<BookItem>>;
  private unsubscribe$ = new Subject();
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.items$ = this.bookService.getBooks().pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
