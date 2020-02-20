import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Stock } from "../models/stock.model";
import { StockStore , StockState } from "../store/stock.store";

@Injectable({ providedIn: "root" })
export class StockQuery extends Query<StockState> {
  items$ = this.select("list");
  constructor(protected store: StockStore) {
    super(store);
  }
}
