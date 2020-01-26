import { Injectable } from '@angular/core';
import { Store, StoreConfig, arrayAdd } from '@datorama/akita';
import { BookItem, BookState } from '../models/book.model';

export function createInitialState(): BookState {
  return {
    list: [],
    totalPages: 0 ,
    currentStartIndex: 0,
    maxStartIndex: 0,
    pageSize: 40
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Book', resettable: true })
export class BookStore extends Store<BookState> {

  constructor() {
    super(createInitialState());
  }

  ClearSearch() {
    this.update((state: BookState) => {
      return ({
        list: [] ,
        totalPages: 0 ,
        currentStartIndex: 0,
        maxStartIndex: 0,
        pageSize: 40
      });
    });
  }

  UpdatePaging(startIndex: number) {
    this.update((state: BookState) => {
      return ({
        currentStartIndex: startIndex
      });
    });
  }

  UpdateSearchPageData(totalPages: number , nextCurrentStartIndex: number, maxStartIndex: number , items: Array<BookItem>) {
    this.update((state: BookState) => {
      return ({
        list: arrayAdd(state.list , items),
        currentStartIndex: nextCurrentStartIndex,
        maxStartIndex,
      });
    });
  }
}

