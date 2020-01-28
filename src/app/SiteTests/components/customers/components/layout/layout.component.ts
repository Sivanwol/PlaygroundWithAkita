import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomerService } from '../../services/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Customer } from '../../models/customer.model';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAddCustmer() {
    this.handleFormDisalog();
  }


  private handleFormDisalog() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "250px",
      data: null
    });

    dialogRef.afterClosed().subscribe((result: {valid: boolean , data: any}) => {
      if (result.valid) {
        this.customerService.add(result.data).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(resulved => {
          if (resulved) {
            this.customerService.reloadCustomerList();
          } else {
            alert("Unknown error");
          }
        });
      }

    });
  }
}
