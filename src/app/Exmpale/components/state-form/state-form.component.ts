import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StateData } from "src/app/Common/state";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-state-form",
  templateUrl: "./state-form.component.html",
  styleUrls: ["./state-form.component.scss"]
})
export class StateFormComponent implements OnInit {
  public form = null;
  public formTitle = "Adding new state";
  constructor(
    public dialogRef: MatDialogRef<StateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StateData,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initalForm();
    if (this.data.existed) {
      this.formTitle = `Edit ${this.data.name} State`;
    }
  }
  initalForm() {
    this.form = this.fb.group({
      name: [
        this.data.name,
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)]
      ],
      desciprtion: [this.data.desciprtion || ""]
    });
  }
  onSubmitClick(): void {
    if (this.form.valid) {
      const values = this.form.value;
      this.data.name = values.name;
      this.data.desciprtion = values.desciprtion;
      this.data.valid = true;
      this.dialogRef.close(this.data);
    }
  }
  onCloseClick(): void {
    this.data.valid = false;
    this.dialogRef.close(this.data);
  }
}
