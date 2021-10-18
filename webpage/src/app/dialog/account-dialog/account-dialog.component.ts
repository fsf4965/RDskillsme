import {Component, Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  password: string;
}

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  
  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder) {}
   

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: [null, [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]]
    });
    
  }

  //used for html div ngIf*
  get f() { return this.resetForm.controls; }

  //submit the form
  onSubmit():void {
    this.submitted = true;
   // validate the inputs
    if (this.resetForm.invalid) {
      return;
    }
    //if password is valid, pass the data to account-m 
    this.dialogRef.close(this.resetForm.value);
  }
}
