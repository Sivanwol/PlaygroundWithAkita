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
  take
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
  ConnectableObservable
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
  getStocks(): Observable<Array<Stock>> {
    return this.notifyStockFetching$.pipe(
      find(() => this.stocks.length > 0),
      mergeMap(stocks => this.handleStockFetchingData()),
      switchMap(stocks => this.connectTimer())
    );
  }

  public updateRefreashRate(refreshRate: number) {
    this.refreshRate = refreshRate;
    this.notifyStockFetching$.next();
  }

  public requestNewStock(stocks: string[]) {
    this.stocks = stocks;
    this.updateStateArr = new Set();
    this.stockStore.clearStocks();
    this.notifyStockFetching$.next();
  }
  private connectTimer(): Observable<Array<Stock>> {
    return this.notifyStockFetching$.pipe(
      tap(rate => (this.refreshRate = rate)),
      switchMap(() => this.stockQuery.items$),
      timeout(this.refreshRate),
      tap(stocks => {
        this.notifyStockFetching$.next();
      })

    );
  }
  private handleStockFetchingData(): Observable<any> {
    return from(this.stocks).pipe(
      distinctUntilChanged(),
      switchMap(stock => {
        return this.requestPollService.requestStock(stock).pipe(
          find(res => !!res),
          tap(res => {
            const updateState = this.updateStateArr.has(res.stockCode);
            if (!updateState) {
              this.stockStore.addNewStockItem(res); // we update the stock as this stock we just got
            } else {
              this.stockStore.updateStock(res.stockCode, res);
            }
          })
        );
      })
    );
  }
}
