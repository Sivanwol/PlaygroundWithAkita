
export interface Customer {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  prop1: string;
  prop2: string;
  prop3: string;
}

export interface CustomerState {
  list: Array<Customer>;
}
