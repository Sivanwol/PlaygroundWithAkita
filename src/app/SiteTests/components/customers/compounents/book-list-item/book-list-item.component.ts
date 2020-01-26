import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { BookItem } from "../../models/book.model";
import { BookService } from '../../services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-book-list-item",
  templateUrl: "./book-list-item.component.html",
  styleUrls: ["./book-list-item.component.scss"]
})
export class BookListItemComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public title: string;
  public hasEbook: string;
  public hasSelected = false;
  @Input()
  public bookItem: BookItem;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookSelected().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(result => {
      this.hasSelected = false;
      if (this.bookItem && result && this.bookItem.id === result.id) {
        this.hasSelected = true;
      }
    });
    this.title = this.bookItem.volumeInfo.title;
    this.hasEbook = (this.bookItem.saleInfo.isEbook) ? "Has Digital Form" : "Print Only";
  }

  onSelectBook() {
    this.bookService.markBookAsSelected(this.bookItem);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
