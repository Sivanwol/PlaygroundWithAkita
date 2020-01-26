import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Observable, merge } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import {
  CustomerService,
  SortDirectorion
} from "../../services/customer.service";
import { Customer } from "../../models/customer.model";
import { Sort } from "@angular/material/sort";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { startWith, switchMap, map } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  public displayedColumns: string[] = ["desciprtion", "name", "actions"];
  resultsLength = 0;
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
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page).pipe(
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
}
