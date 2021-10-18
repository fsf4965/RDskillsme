import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { FeedbackFile } from 'src/app/models/feedback_file.model';
import { FeedbackFileService } from 'src/app/services/feedback_file.service';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.css']
})
export class FeedbackDetailsComponent implements OnInit {
  @Input()
  feedbackUpload!: FeedbackFile;
  constructor(private feedbackService: FeedbackFileService, public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  //open the file delete dialog box
  openDialogDeleteFile(): void {
  
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this. deleteFile()
      }
      
    });
  }

  // delete the current file
  deleteFile(): void {
    this.feedbackService.deleteFile(this.feedbackUpload.id)
      .subscribe(
        response => {
          console.log(response);
          
        },
        error => {
          console.log(error);
        });
  }
}
