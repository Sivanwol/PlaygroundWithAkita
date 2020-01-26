import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { BookItem , BookState } from "../models/book.model";
import { BookStore } from "../store/book.store";
import { Observable, combineLatest, of } from "rxjs";
import { switchMap , filter, bufferCount, take, distinctUntilChanged } from "rxjs/operators";
export interface SearchMetaData {
  totalPage: number;
  currentStartIndex: number;
  maxStartIndex: number;
  pageSize: number;
}
@Injectable({ providedIn: "root" })
export class BookQuery extends Query<BookState> {
  items$ = this.select("list");
  totalPage$ = this.select("totalPages");
  currentStartIdx$ = this.select("currentStartIndex");
  maxStartIdx$ = this.select("maxStartIndex");
  pageSize$ = this.select("pageSize");
  constructor(protected store: BookStore) {
    super(store);
  }

  getStackBook(startIndex: number, pageSize: number): Observable<Array<BookItem>> {
    return this.items$.pipe(
      // take(1),
      // filter((result , idx) => startIndex >= idx ),
      // bufferCount(pageSize)
    );
  }
  getSearchMetaData(): Observable<SearchMetaData> {
    return combineLatest(this.totalPage$, this.currentStartIdx$, this.maxStartIdx$ , this.pageSize$).pipe(
      take(1),
      switchMap( result => {
        return of({
          totalPage: result[0],
          currentStartIndex: result[1],
          maxStartIndex: result[2],
          pageSize: result[3]
        });
      })
    );
  }
}
