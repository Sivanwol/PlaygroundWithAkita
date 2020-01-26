import { Component, OnInit, OnDestroy } from "@angular/core";
import { BookService } from "../../services/book.service";
import { BookItem } from "../../models/book.model";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-book-selected-item",
  templateUrl: "./book-selected-item.component.html",
  styleUrls: ["./book-selected-item.component.scss"]
})
export class BookSelectedItemComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public title: string;
  public subtitle: string;
  public hasEbook: string;
  public hasSelected = false;
  public tumbnail: string;
  private bookItem: BookItem;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    let firstTimeSelected = true;
    this.bookService.getBookSelected().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(result => {
      this.hasSelected = false;
      if ((this.bookItem && result && this.bookItem.id !== result.id) || firstTimeSelected) {
        firstTimeSelected = false;
        this.hasSelected = true;
        this.bookItem = result;
        this.title = this.bookItem.volumeInfo.title;
        this.hasEbook = (this.bookItem.saleInfo.isEbook) ? "Has Digital Form" : "Print Only";
        this.subtitle = this.bookItem.volumeInfo.subtitle;
        this.tumbnail = this.bookItem.volumeInfo.imageLinks.thumbnail;

      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
