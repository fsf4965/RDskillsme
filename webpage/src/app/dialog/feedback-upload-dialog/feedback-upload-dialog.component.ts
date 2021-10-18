import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedbackFileService } from 'src/app/services/feedback_file.service';

export interface DialogData {
 dev_proId: number;
}


@Component({
  selector: 'app-feedback-upload-dialog',
  templateUrl: './feedback-upload-dialog.component.html',
  styleUrls: ['./feedback-upload-dialog.component.css']
})
export class FeedbackUploadDialogComponent implements OnInit {

  isuploadeddata!: { isuploaded: boolean; };
  selectedFiles!: FileList;
  currentFileUpload: File|null=null;

  constructor(
    public dialogRef: MatDialogRef<FeedbackUploadDialogComponent>,
    private feedbackFileService: FeedbackFileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  
  handleFileInput(files: FileList) {
    this.currentFileUpload = files.item(0);
  }

  upload() {
    this.currentFileUpload =this.selectedFiles.item(0);
    this.feedbackFileService.pushFileToStorage(this.currentFileUpload!,this.data.dev_proId).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {

        alert("file upload successfully");
        
/*
        this.isuploadeddata.isuploaded=true;
        this.dev_projectService.update(this.currentDev_ProjectID,{isuploaded:true}).subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
*/
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    //this.dev_projectService.update(this.currentDev_ProjectID,data)
    //this.selectedFiles = undefined;
  }

}
