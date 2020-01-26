import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { tap, switchMap, take, find } from "rxjs/operators";
import { throwError, Observable, Subscription , Subject, BehaviorSubject, of } from "rxjs";
import { User } from "../models/user.model";
import { UsersStore } from "../store/users.store";
import { UserQuery } from "../queries/users.query";
import { NgxSpinnerService } from "ngx-spinner";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
export enum PagingDirectorion {
  Next,
  Priv
}
@Injectable({ providedIn: "root" })
export class UserService {
  private notifySelectedBook$: Subject<User> = new Subject<User>();
  private ApiURI = "http://localhost:3000/users";
  private request$: Subscription;
  constructor(private userStore: UsersStore,
              private userQuery: UserQuery,
              private http: HttpClient,
              private spinner: NgxSpinnerService) {
  }
login(email: string , passoword: string): Observable<boolean> {
    const searchUri = this.ApiURI + `?email=${email}`;
    let statusLogin = false;
    return this.http.get<Array<User>>(searchUri,httpOptions).pipe(
      tap((result: Array<User>) => {
        if (result.length === 1){
          statusLogin = true;
          this.userStore.Login(result[1]);
        }
      }),
      switchMap(result => of(statusLogin))
    );
  }

  logout() {
    this.userStore.Logout();
  }
  // searchBooks(searchQuery: string , onlyEbooks = false): void {
  //   const startIndex = this.lastSearchMetaData.currentStartIndex;
  //   let searchParams = `${searchQuery}&startIndex=${startIndex}&maxResults=10`;
  //   if (onlyEbooks) {
  //     searchParams += "&filter=ebooks";
  //   }
  //   const ApiURI = this.ApiURI + searchParams;
  //   let newSearch = false;
  //   if (this.lastSearchQuery !== searchQuery || this.lastSearchOnlyEbookFlag !== onlyEbooks ) {
  //     newSearch = true;
  //     this.initalSearchParams();
  //   }
  //   if (this.lastSearchMetaData.maxStartIndex > startIndex || newSearch) {
  //     this.lastSearchQuery = searchQuery;
  //     this.lastSearchOnlyEbookFlag = onlyEbooks;
  //     if (this.request$) {
  //       this.request$.unsubscribe();
  //     }
  //     this.spinner.show();
  //     this.request$ = this.http.get<BookResult>(ApiURI, httpOptions).pipe(
  //       tap((result: BookResult) => {
  //         // tslint:disable-next-line: max-line-length
  //         const pages = Math.ceil((result.totalItems / this.lastSearchMetaData.pageSize) + (result.totalItems % this.lastSearchMetaData.pageSize));
  //         const maxStartIndex = this.lastSearchMetaData.maxStartIndex > startIndex ? startIndex : this.lastSearchMetaData.maxStartIndex;
  //         this.lastSearchMetaData.totalPage = pages;
  //         this.lastSearchMetaData.maxStartIndex = maxStartIndex;
  //         this.bookStore.UpdateSearchPageData(pages, startIndex, maxStartIndex, result.items);
  //       })
  //     ).subscribe(result => {
  //       this.request$ = null;
  //       this.spinner.hide();
  //       console.log("Here All data", result);
  //     });
  //   }
  // }

  // updatePaging(pagingDirection: BookPagingDirectorion) {
  //   const startIndex = this.lastSearchMetaData.currentStartIndex;
  //   const pageSize = this.lastSearchMetaData.pageSize;
  //   if (pagingDirection === BookPagingDirectorion.Priv && startIndex > 0) {
  //     this.bookStore.UpdatePaging(startIndex - pageSize);
  //   } else {
  //     const maxStartIndex =  startIndex + pageSize;
  //     if (maxStartIndex > this.lastSearchMetaData.maxStartIndex) {
  //       this.searchBooks(this.lastSearchQuery, this.lastSearchOnlyEbookFlag);
  //     }
  //     this.bookStore.UpdatePaging(startIndex + pageSize);
  //   }
  // }
  // getBooks(): Observable<Array<BookItem>> {
  //   const startIndex = this.lastSearchMetaData.currentStartIndex || 0;
  //   const pageSize = this.lastSearchMetaData.pageSize || 40;
  //   return this.bookQuery.getStackBook(startIndex, pageSize);
  // }
}
