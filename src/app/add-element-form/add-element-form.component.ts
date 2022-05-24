import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../models/periodic-element';

@Component({
  selector: 'app-add-element-form',
  templateUrl: './add-element-form.component.html',
  styleUrls: ['./add-element-form.component.scss'],
})
export class AddElementFormComponent implements OnInit {
  action: string;
  localData: any;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddElementFormComponent>
  ) {
    console.log(data);
    this.localData = { ...data };
    this.action = this.localData.action;
    console.log(this.localData);
  }

  ngOnInit() {}

  getElementData() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
