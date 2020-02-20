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
  publish
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
  private notifyStockUpdateFetching$: Subject<null> = new Subject<null>();
  private obsTimerUpdate$: Observable<any>;
  private notifyStockUpdateRefreashRate$: BehaviorSubject<
    number
  > = new BehaviorSubject<number>(30000);
  private notifyStockPoll$: BehaviorSubject<Array<Stock>> = new BehaviorSubject<
    Array<Stock>
  >([]);
  constructor(
    private stockStore: StockStore,
    private stockQuery: StockQuery,
    private requestPollService: RequestPollService
  ) {}
  getStocks(): Observable<Array<Stock>> {
    return this.notifyStockFetching$.pipe(
      find(() => this.stocks.length > 0),
      mergeMap(stocks => {
        return this.handleStockFetchingData().pipe(
          switchMap(stock => {
            return this.stockQuery.items$;
          }),
          tap(stocks => {
            this.notifyStockPoll$.next(stocks); // we trigger this for the main subscriver
          })
        );
      }),
      switchMap(stocks => this.connectTimer())
    );
  }

  public updateRefreashRate(refreshRate: number) {
    this.refreshRate = refreshRate;
    this.notifyStockUpdateFetching$.next();
  }

  public requestNewStock(stocks: string[]) {
    this.stocks = stocks;
    this.updateStateArr = new Set();
    this.stockStore.clearStocks();
    this.notifyStockFetching$.next();
  }
  private connectTimer(): Observable<Array<Stock>> {
    return this.notifyStockUpdateRefreashRate$.pipe(
      tap(rate => (this.refreshRate = rate)),
      switchMap(() => {
        return interval(this.refreshRate).pipe(
          tap(stocks => {
            this.notifyStockFetching$.next();
          }),
          publish()
        );
      }),
      switchMap(stocks => {
        return this.notifyStockPoll$;
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
      }),
      delay(500)
    );
  }
}
