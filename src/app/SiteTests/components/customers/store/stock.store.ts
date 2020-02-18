import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface StockStoreState {
  key: string;
}

export function createInitialState(): StockStoreState {
  return {
    key: ""
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "StockStore" })
export class StockStore extends Store<StockStoreState> {
  constructor() {
    super(createInitialState());
  }
}
