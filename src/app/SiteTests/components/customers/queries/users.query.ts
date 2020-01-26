import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { UserState } from "../models/user.model";
import { UsersStore } from "../store/users.store";
import { Observable, combineLatest, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserQuery extends Query<UserState> {
  items$ = this.select("list");
  loggedUser$ = this.select("loggedUser");
  constructor(protected store: UsersStore) {
    super(store);
  }

  isLoggin(): Observable<boolean> {
    return this.loggedUser$.pipe(
      switchMap(state => of(state !== null))
    )
  }
}
