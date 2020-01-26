import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { tap, switchMap, take, find } from "rxjs/operators";
import { throwError, Observable, Subscription , Subject, BehaviorSubject } from "rxjs";
import { BookResult, BookItem } from "../models/book.model";
import { BookStore } from "../store/book.store";
import { BookQuery, SearchMetaData } from "../queries/book.query";
import { NgxSpinnerService } from "ngx-spinner";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
export enum BookPagingDirectorion {
  Next,
  Priv
}
@Injectable({ providedIn: "root" })
export class BookService {

  private notifySelectedBook$: Subject<BookItem> = new Subject<BookItem>();
  private lastSearchQuery = "";
  private lastSearchOnlyEbookFlag = false;
  private lastSearchMetaData: SearchMetaData = {
    totalPage: 0,
    currentStartIndex: 0,
    maxStartIndex: 0,
    pageSize: 40
  };
  private ApiURI = "https://www.googleapis.com/books/v1/volumes?q=";
  private request$: Subscription;
  constructor(private bookStore: BookStore,
              private bookQuery: BookQuery,
              private http: HttpClient,
              private spinner: NgxSpinnerService) {
  }
  markBookAsSelected(book: BookItem) {
    this.notifySelectedBook$.next(book);
  }
  getBookSelected() {
    return this.notifySelectedBook$;
  }
// har&startIndex=&maxResults=40&filter=ebooks
  initalSearchParams() {
    this.bookStore.ClearSearch();
    this.lastSearchMetaData = {
      totalPage: 0,
      currentStartIndex: 0,
      maxStartIndex: 0,
      pageSize: 40
    };
  }

  searchBooks(searchQuery: string , onlyEbooks = false): void {
    const startIndex = this.lastSearchMetaData.currentStartIndex;
    let searchParams = `${searchQuery}&startIndex=${startIndex}&maxResults=10`;
    if (onlyEbooks) {
      searchParams += "&filter=ebooks";
    }
    const ApiURI = this.ApiURI + searchParams;
    let newSearch = false;
    if (this.lastSearchQuery !== searchQuery || this.lastSearchOnlyEbookFlag !== onlyEbooks ) {
      newSearch = true;
      this.initalSearchParams();
    }
    if (this.lastSearchMetaData.maxStartIndex > startIndex || newSearch) {
      this.lastSearchQuery = searchQuery;
      this.lastSearchOnlyEbookFlag = onlyEbooks;
      if (this.request$) {
        this.request$.unsubscribe();
      }
      this.spinner.show();
      this.request$ = this.http.get<BookResult>(ApiURI, httpOptions).pipe(
        tap((result: BookResult) => {
          // tslint:disable-next-line: max-line-length
          const pages = Math.ceil((result.totalItems / this.lastSearchMetaData.pageSize) + (result.totalItems % this.lastSearchMetaData.pageSize));
          const maxStartIndex = this.lastSearchMetaData.maxStartIndex > startIndex ? startIndex : this.lastSearchMetaData.maxStartIndex;
          this.lastSearchMetaData.totalPage = pages;
          this.lastSearchMetaData.maxStartIndex = maxStartIndex;
          this.bookStore.UpdateSearchPageData(pages, startIndex, maxStartIndex, result.items);
        })
      ).subscribe(result => {
        this.request$ = null;
        this.spinner.hide();
        console.log("Here All data", result);
      });
    }
  }

  updatePaging(pagingDirection: BookPagingDirectorion) {
    const startIndex = this.lastSearchMetaData.currentStartIndex;
    const pageSize = this.lastSearchMetaData.pageSize;
    if (pagingDirection === BookPagingDirectorion.Priv && startIndex > 0) {
      this.bookStore.UpdatePaging(startIndex - pageSize);
    } else {
      const maxStartIndex =  startIndex + pageSize;
      if (maxStartIndex > this.lastSearchMetaData.maxStartIndex) {
        this.searchBooks(this.lastSearchQuery, this.lastSearchOnlyEbookFlag);
      }
      this.bookStore.UpdatePaging(startIndex + pageSize);
    }
  }
  getBooks(): Observable<Array<BookItem>> {
    const startIndex = this.lastSearchMetaData.currentStartIndex || 0;
    const pageSize = this.lastSearchMetaData.pageSize || 40;
    return this.bookQuery.getStackBook(startIndex, pageSize);
  }
}
