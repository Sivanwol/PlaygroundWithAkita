import { Injectable } from "@angular/core";
import { ajax } from "rxjs/ajax";
import { map, retry, catchError } from "rxjs/operators";
import { throwError, of, Observable } from "rxjs";
import config from "../config";
import { Stock } from "../models/stock.model";

@Injectable({
  providedIn: "root"
})
export class RequestPollService {
  constructor() {}

  requestStock(stock): Observable<Stock> {
    const url = config.API_Stock.replace("%%symbol%%", stock);
    return ajax(url).pipe(
      map(res => {
        if (res === null || res.hasOwnProperty("Error Message")) {
          return throwError(new Error("No data found..."));
        }
        const obj: Stock = {
          stockCode: stock,
          open: res["02. open"],
          high: res["03. high"],
          low: res["04. low"],
          volume: res["06. volume"],
          lastUpdate: res["07. latest trading day"],
          change: res["09. change"],
          changePresent: res["10. change percent"]
        };
        return obj;
      }),
      retry(3),
      catchError(error => {
        return of(null);
      })
    );
  }
}
