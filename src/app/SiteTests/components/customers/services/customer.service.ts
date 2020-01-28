import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import {
  catchError,
  tap,
  switchMap,
  take,
  find,
  map,
  filter,
  mergeMap
} from "rxjs/operators";
import { Observable, Subscription, Subject, BehaviorSubject, of } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { Customer } from "../models/customer.model";
import { CustomerStore } from "../store/customer.store";
import { CustomerQuery } from "../queries/customer.query";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
export enum PagingDirectorion {
  Next,
  Priv
}
export enum SortDirectorion {
  ASC,
  DESC
}
@Injectable({ providedIn: "root" })
export class CustomerService {
  private notifyReloadCustomerList$: Subject<null> = new Subject<null>();

  private notifySelectedCustomer$: Subject<Customer> = new Subject<Customer>();
  private ApiURI = "http://localhost:3000/customers";
  private request$: Subscription;
  private nextIdx = 0;

  private currentSortDirection = SortDirectorion.DESC;
  constructor(
    private customerStore: CustomerStore,
    private customerQuery: CustomerQuery,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  reloadCustomerList() {
    this.notifyReloadCustomerList$.next();
  }

  getReloadCustomerList(): Observable<null> {
    return this.notifyReloadCustomerList$;
  }

  markSelectCustomer(customer: Customer) {
    this.notifySelectedCustomer$.next(customer);
  }
  getSelectedCustomer(): Observable<Customer> {
    return this.notifySelectedCustomer$;
  }
  delete(id: number): Observable<boolean> {
    return this.http.delete(this.ApiURI + `/${id}`, httpOptions).pipe(
      take(1),
      catchError(() => {
        return of(false);
      }),
      map(result => {
        this.customerStore.remove(id);
        return true;
      })
    );
  }

  edit(id: number, customer: Customer): Observable<boolean> {
    const postData = Object.assign({}, customer);
    return this.http.put(this.ApiURI + `/${id}`, postData, httpOptions).pipe(
      take(1),
      catchError(() => {
        return of(false);
      }),
      map(result => {
        this.customerStore.edit(id, customer);
        return true;
      })
    );
  }

  add(customer: Customer): Observable<boolean> {
    return this.customerQuery.lastItem().pipe(
      switchMap(item => {
        const postData = Object.assign({}, customer);
        const nextID = !item ? 1 : item.id++;
        postData.id = nextID;
        return this.http.post(this.ApiURI, postData, httpOptions).pipe(
          take(1),
          catchError(() => {
            return of(false);
          }),
          map(result => {
            this.customerStore.add(customer);
            return true;
          })
        );
      })
    );
  }
  requestListData() {
    return this.http.get<Array<Customer>>(this.ApiURI, httpOptions).pipe(
      catchError(() => {
        return of([]);
      }),
      map(result => {
        this.customerStore.updateCustomerState(result);
        return result;
      })
    );
  }

  getList(
    sortBy: string,
    sortByDirection: SortDirectorion,
    pageSize: number,
    pageIndex: number
  ) {
    return this.customerQuery.items$.pipe(
      map(items => {
        items.sort((sortCustomerA, sortCustomerB) => {
          const nameA = sortCustomerA[sortBy].toUpperCase(); // ignore upper and lowercase
          const nameB = sortCustomerB[sortBy].toUpperCase();
          if (sortByDirection !== this.currentSortDirection) {
            if (sortByDirection === SortDirectorion.ASC && nameA < nameB) {
              return -1;
            } else if (
              sortByDirection === SortDirectorion.DESC &&
              nameA > nameB
            ) {
              return 1;
            }
          }
          return 0;
        });
        if (sortByDirection !== this.currentSortDirection) {
          this.currentSortDirection = sortByDirection;
        }
        if (this.nextIdx === 0) {
          this.nextIdx += pageSize;
          return items.slice(0, pageSize);
        } else {
          if (pageIndex > this.nextIdx) {
            this.nextIdx += pageSize;
          } else {
            this.nextIdx -= pageSize;
          }
          return items.slice(this.nextIdx, pageSize);
        }
      }),
      catchError(() => of([]))
    );
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
