import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../../models/customer.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  public form = null;
  public formTitle = "Adding new Customer";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data) {
      this.formTitle = "Edit Customer";
    } else {
      this.data = {
        id: 0 ,
        email: '',
        firstName: '',
        lastName: '',
        prop1: '',
        prop2: '',
        prop3: ''
      };
    }
    this.initalForm();
  }
  initalForm() {
    this.form = this.fb.group({
      email: [
        this.data.email,
        [Validators.required, Validators.minLength(4), Validators.email]
      ],
      firstName: [
        this.data.firstName,
        [Validators.required, Validators.minLength(2)]
      ],
      lastName: [
        this.data.lastName,
        [Validators.required, Validators.minLength(2)]
      ],
      prop1: [
        this.data.prop1,
        [Validators.required, Validators.minLength(2)]
      ],
      prop2: [
        this.data.prop2,
        [Validators.required]
      ],
      prop3: [
        this.data.prop3,
        [Validators.minLength(2)]
      ]
    });
  }

  onSubmitClick(): void {
    if (this.form.valid) {
      const values = this.form.value;
      this.dialogRef.close({valid: false, data: values});
    }
  }
  onCloseClick(): void {
    this.dialogRef.close({valid: false, data: null});
  }
}
