import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Subject } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-custmer-select',
  templateUrl: './custmer-select.component.html',
  styleUrls: ['./custmer-select.component.scss']
})
export class CustmerSelectComponent implements OnInit , OnDestroy{

  public customerData: Customer;
  private unsubscribe$ = new Subject();
  constructor(
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getSelectedCustomer().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(customer => this.customerData = customer);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
