import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { CustomerState } from '../models/customer.model';

@Injectable({ providedIn: "root" })
export class CustomersQuery extends Query<CustomerState> {
  items$ = this.select("list");
  constructor(protected store: UsersStore) {
    super(store);
  }


}
