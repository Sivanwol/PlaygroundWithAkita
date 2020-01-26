import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { StateFormComponent } from "../state-form/state-form.component";
import { StateData } from "src/app/Common/state";
import { StateService } from "../../services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Component({
  selector: "app-main-test",
  templateUrl: "./main-test.component.html",
  styleUrls: ["./main-test.component.scss"]
})
export class MainTestComponent implements OnInit {

  public displayedColumns: string[] = ["desciprtion", "name", "actions"];
  public list$: Observable<{
    name: string;
    desciprtion: string;
}[]> = null;
  public hasDataDisplay = false;
  constructor(public dialog: MatDialog, private stateService: StateService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  public OnEditState(entity: StateData) {
    this.handleFormDisalog({name: entity.name, desciprtion: entity.desciprtion, existed: true});
  }

  public OnRemoveState(entity: StateData) {
    this.stateService.Delete(entity.name);
  }

  public OnNewState() {
    this.handleFormDisalog({name: "", desciprtion: "", existed: false});
  }

  private reloadList() {
    this.list$ = this.stateService.GetAll().pipe(
      tap(result => {
        this.hasDataDisplay = false;
        if (result.length > 0) {
          this.hasDataDisplay = true;
        }
        this.changeDetectorRef.detectChanges();
      })
    );
  }
  private handleFormDisalog( entity: StateData) {
    const editStateOrignalName = entity.name;
    const dialogRef = this.dialog.open(StateFormComponent, {
      width: "250px",
      data: entity
    });

    dialogRef.afterClosed().subscribe((result: StateData) => {
      if (result.valid) {
        if (result.existed) {
          this.stateService.Edit(editStateOrignalName, result);
        } else {
          this.stateService.Add(result);
        }
      }
      this.hasDataDisplay = true;
      this.reloadList();
      console.log("The dialog was closed", result);
    });
  }
}
