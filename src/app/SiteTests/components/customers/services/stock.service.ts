import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { StockStore } from './stock.store';
import { Stock } from './stock.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StockService {

  constructor(private stockStore: StockStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Stock[]>('https://api.com').pipe(tap(entities => {
      this.stockStore.set(entities);
    }));
  }

  add(stock: Stock) {
    this.stockStore.add(stock);
  }

  update(id, stock: Partial<Stock>) {
    this.stockStore.update(id, stock);
  }

  remove(id: ID) {
    this.stockStore.remove(id);
  }
}
