import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { CustomerState, Customer } from "../models/customer.model";
import { CustomerStore } from "../store/customer.store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CustomerQuery extends Query<CustomerState> {
  items$ = this.select("list");
  constructor(protected store: CustomerStore) {
    super(store);
  }

  lastItem(): Observable<Customer> {
    return this.items$.pipe(
      map(items => {
        const item: Customer = items[items.length - 1] ? null : items[items.length - 1];
        return item;
      })
    );
  }

}
