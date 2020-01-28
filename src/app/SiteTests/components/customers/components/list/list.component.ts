import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from "@angular/core";
import { Observable, merge, Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import {
  CustomerService,
  SortDirectorion
} from "../../services/customer.service";
import { Customer } from "../../models/customer.model";
import { Sort } from "@angular/material/sort";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { startWith, switchMap, map, takeUntil } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit , OnDestroy {
  public displayedColumns: string[] = ["id", "firstName", "lastName","propAction","propsDefined","actions"];
  resultsLength = 0;
  private unsubscribe$ = new Subject();
  public hasDataDisplay = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Customer>();
  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.paginator.pageIndex = 0;
    this.sort.sortChange.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => (this.paginator.pageIndex = 0));
    this.customerService.getReloadCustomerList().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        this.spinner.show();
        return this.customerService.getList(
          this.sort.active,
          (this.sort.direction === "desc") ? SortDirectorion.DESC : SortDirectorion.ASC,
          this.paginator.pageSize,
          this.paginator.pageIndex);
      }),
      map(data => {
        this.spinner.hide();
        return data;
      })
    ).subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  OnRemoveCustomer(customer: Customer) {
    this.customerService.delete(customer.id).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(resulved => {
      if (resulved) {
        this.paginator.pageIndex = 0; //attempt to reload
      } else {
        alert("Unknown error");
      }
    });
  }
  public OnEditCustomer(customer: Customer) {
    this.handleFormDisalog(customer);
  }

  public OnSelectCustomer(customer: Customer) {
    this.customerService.markSelectCustomer(customer);
  }

  private handleFormDisalog(customer: Customer) {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "250px",
      data: customer
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((result: {valid: boolean , data: Customer}) => {
      if (result.valid) {
        this.customerService.edit(customer.id,result.data).pipe(
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
