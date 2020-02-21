import { Injectable } from "@angular/core";
import {
  Store,
  StoreConfig,
  arrayAdd,
  arrayRemove,
  arrayUpdate
} from "@datorama/akita";
import { Stock } from "../models/stock.model";

export interface StockState {
  list: Array<Stock>;
}

export function createInitialState(): StockState {
  return {
    list: []
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "StockStore" })
export class StockStore extends Store<StockState> {
  constructor() {
    super(createInitialState());
  }
  addNewStockItem(stock: Stock) {
    this.update((state: StockState) => {
      return {
        list: arrayAdd(state.list, stock)
      };
    });
  }

  updateStock(stockCode: string, stock: Stock) {
    this.update((state: StockState) => {
      return {
        list: arrayUpdate(state.list, stockCode, stock, "stockCode")
      };
    });
  }

  clearStock(stockCode: string) {
    this.update((state: StockState) => {
      return {
        list: arrayRemove(state.list, stockCode, "stockCode")
      };
    });
  }
  clearStocks() {
    this.update((state: StockState) => {
      return {
        list: []
      };
    });
  }
}
