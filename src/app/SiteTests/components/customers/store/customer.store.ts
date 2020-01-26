import { Injectable } from "@angular/core";
import { Store, StoreConfig, arrayAdd, arrayUpdate, arrayRemove } from "@datorama/akita";
import { CustomerState, Customer } from "../models/customer.model";

export function createInitialState(): CustomerState {
  return {
    list: []
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "customer", resettable: true })
export class CustomerStore extends Store<CustomerState> {

  constructor() {
    super(createInitialState());
  }

  updateCustomerState(customers: Array<Customer>) {
    this.update((state: CustomerState) => {
      return ({
        list: [...customers]
      });
    });
  }

  add(customer: Customer) {
    this.update((state: CustomerState) => {
      return ({
        list: arrayAdd(state.list , customer)
      });
    });
  }

  edit(customerId: number, data: Customer) {
    this.update((state: CustomerState) => {
      return ({
        list: arrayUpdate(state.list , customerId, data)
      });
    });
  }

  remove(customerId) {
    this.update((state: CustomerState) => {
      return ({
        list: arrayRemove(state.list , customerId)
      });
    });
  }
}

