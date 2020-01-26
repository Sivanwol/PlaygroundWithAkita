import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { StateStore, StateState } from "../store/state.store";
import { switchMap } from "rxjs/operators";
import { StateData } from "src/app/Common/state";
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: "root" })
export class StateQuery extends Query<StateState> {

  selectStatesData$ = this.select('list');
  constructor(protected store: StateStore) {
    super(store);
  }

  find(stateName: string): Observable<StateData> {
    return this.selectStatesData$.pipe(switchMap(stateData => {
      let locatedItem: StateData = null;
      try {
        stateData.forEach(item => {
          if (item.name === stateName) {
            locatedItem = item;
            throw null;
          }
        });
      } catch(e) {}
      return of(locatedItem);
    }));
  }
}
