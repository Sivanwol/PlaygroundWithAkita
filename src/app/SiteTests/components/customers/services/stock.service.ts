import { Injectable } from "@angular/core";
import { ID } from "@datorama/akita";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Stock } from "../models/stock.model";
import { StockStore } from '../store/stock.store';

@Injectable({ providedIn: "root" })
export class StockService {
  constructor(private stockStore: StockStore, private http: HttpClient) {}

  get() {
    return this.http.get<Stock[]>("https://api.com").pipe(
      tap(entities => {
        // this./stockStore.set(entities);
      })
    );
  }

}
