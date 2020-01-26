import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StateStore } from "../store/state.store";
import { StateData } from "src/app/Common/state";
import { StateQuery } from "../queries";
import { tap, find } from "rxjs/operators";
import { Observable } from 'rxjs';


@Injectable({ providedIn: "root" })
export class StateService {

  constructor(private stateStore: StateStore,
              private stateQuery: StateQuery,
              private http: HttpClient) {
  }

  public GetAll() {
    return this.stateQuery.selectStatesData$;
  }

  public Add(data: StateData) {
    delete data.existed;
    delete data.valid;
    this.stateStore.add(data);
  }

  public Edit(stateName , data: StateData) {
    delete data.existed;
    delete data.valid;
    this.stateQuery.find(stateName).pipe(
      find(item => !!item),
      tap(item => {
        this.stateStore.edit(stateName, data);
      })
    ).subscribe();
  }

  public Delete(stateName ) {
    this.stateQuery.find(stateName).pipe(
      find(item => !!item),
      tap(item => {
        this.stateStore.remove(stateName);
      })
    ).subscribe();
  }

}
