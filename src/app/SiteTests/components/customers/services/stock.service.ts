import { Injectable } from "@angular/core";
import {
  tap,
  switchMap,
  timeInterval,
  mergeMap,
  find,
  delay,
  bufferCount,
  distinctUntilChanged,
  timeout,
  publish,
  exhaustMap,
  take,
  concatMap,
  repeat,
  catchError
} from "rxjs/operators";
import { Stock } from "../models/stock.model";
import { StockStore } from "../store/stock.store";
import {
  Subject,
  BehaviorSubject,
  of,
  Observable,
  from,
  interval,
  forkJoin,
  ConnectableObservable,
  race
} from "rxjs";
import { StockQuery } from "../queries/stock.query";
import { RequestPollService } from "./request-poll.service";
@Injectable({ providedIn: "root" })
export class StockService {
  private refreshRate: number;
  private updateStateArr: Set<string>;
  private stocks: string[] = [];
  private notifyStockFetching$: Subject<null> = new Subject<null>();
  constructor(
    private stockStore: StockStore,
    private stockQuery: StockQuery,
    private requestPollService: RequestPollService
  ) {}
  handleStocks(): Observable<void> {
    return this.notifyStockFetching$.pipe(
      mergeMap(stocks => this.handleStockFetchingData()),
      catchError(err => {
        console.log(err);
        return of([]);
      }),
      delay(this.refreshRate),
      repeat()
    );
  }

  getStocks(): Observable<Array<Stock>> {
    return this.stockQuery.items$;
  }

  public updateRefreashRate(refreshRate: number) {
    this.refreshRate = refreshRate;
    this.notifyStockFetching$.next();
  }

  public requestNewStock(stocks: string[]) {
    this.stockStore.clearStocks();
    this.stocks = stocks;
    this.updateStateArr = new Set();
    this.notifyStockFetching$.next();
  }

  private handleStockFetchingData(): Observable<any> {
    return from(this.stocks).pipe(
      mergeMap(stock => {
        return this.requestPollService.requestStock(stock).pipe(
          tap(res => {
            if (res) {
              const updateState = this.updateStateArr.has(res.stockCode);
              if (!updateState) {
                this.updateStateArr.add(res.stockCode);
                this.stockStore.addNewStockItem(res); // we update the stock as this stock we just got
              } else {
                this.stockStore.updateStock(res.stockCode, res);
              }
            }
          })
        );
      }),
      catchError(err => {
        console.log(err);
        return of([]);
      })
    );
  }
}
