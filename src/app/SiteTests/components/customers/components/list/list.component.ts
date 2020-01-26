import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public displayedColumns: string[] = ["desciprtion", "name", "actions"];
  public list$: Observable<Array<Customer>> = null;
  public hasDataDisplay = false;
  constructor(public dialog: MatDialog, private customerService: CustomerService, private changeDetectorRef: ChangeDetectorRef) { }


  ngOnInit() {
  }

}
