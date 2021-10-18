import { HttpResponse,HttpEventType, } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { Dev_Project } from 'src/app/models/dev_project.model';
import { Project } from 'src/app/models/project.model';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { Dev_ProjectService } from 'src/app/services/dev_project.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-my-dev-project-detail',
  templateUrl: './my-dev-project-detail.component.html',
  styleUrls: ['./my-dev-project-detail.component.css']
})
export class MyDevProjectDetailComponent implements OnInit {
  
  currentDev_Project: Dev_Project = {
    id:'',
    isuploaded:'',
    accountId:'',
    projectId:'',
    createdAt:'',
  };

  currentProject: Project = {
    id:'',
    name: '',
    description: '',
    typeAllowed: '',
    createdAt:''
  };

  selectedFiles!: FileList;
  currentFileUpload: File|null=null;
  progress: { percentage: number } = { percentage: 0 };

 public currentDev_ProjectID!:number;
  message = '';
  messaged = '';
  editable: boolean = false;
  replaced: boolean = false;
  
  constructor(
    private projectService: ProjectService,
    private accountDataShareService: AccountDataShareService,
    private dev_projectService: Dev_ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.message = '';
    this.messaged = '';
    this.getAccountType();
    if(this.getAccountType())
    {
      this.editable=true;
    }
    this.getDev_Project(this.route.snapshot.params.id);
    
  }

  // check the current user type, is normal user or admin
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }

  // get the current dev_pro detail
  getDev_Project(id: string): void {
    this.messaged = '';
    this.dev_projectService.get(id)
      .subscribe(
        data => {
          this.currentDev_Project = data;
          this.currentDev_ProjectID=this.currentDev_Project.id
          console.log(data);
          if(this.currentDev_Project.projectId!=null)
          {
          this.getProject(this.currentDev_Project.projectId);
          }
          else{
            this.messaged="This Project has been deleted!"
          }
        },
        error => {
          console.log(error);
        });
   
  }
  // get related project detail
  getProject(id: string): void {
  
    this.projectService.get(id)
      .subscribe(
        data => {
          this.currentProject = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

  }

  // update the current dev_pro detail
  updateDev_Project(): void {
    this.message = '';

    this.dev_projectService.update(this.currentDev_Project.id, this.currentDev_Project)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This Dev_Project was updated successfully!';
        },
        error => {
          console.log(error);
        });
    //reload
    this.getProject(this.currentDev_Project.projectId);
  }

  // delete the current dev_pro
  deleteDev_Project(): void {
    this.dev_projectService.delete(this.currentDev_Project.id)
      .subscribe(
        response => {
          console.log(response);
          alert("Delete Successfully")
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error => {
          console.log(error);
        });
      
  }

  // reset the dev_pro info
  resetForm() {
    this.getDev_Project(this.route.snapshot.params.id);
    this.getProject(this.currentDev_Project.projectId);
  }

  // go to the my developing projects page
  goToMy_Dev(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // open the dev_pro delete dialog box to delete dev_pro
  openDialogDeleteProject(): void {
  
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.deleteDev_Project()
      }
      
    });

  }
  // open the dev_pro delete dialog box to delete file
  openDialogDeleteFile(): void {
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.deleteDev_Project()
      }
      
    });

  }

  //upload zip file
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  
  handleFileInput(files: FileList) {
    this.currentFileUpload = files.item(0);
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload =this.selectedFiles.item(0);
    this.dev_projectService.upload(this.currentDev_ProjectID,this.currentFileUpload!,'true').subscribe((event: { type: HttpEventType; loaded: number; total: number; }) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);

        alert("file upload successfully");
        this.getDev_Project(this.route.snapshot.params.id);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

  }

  //replace zip file button
  replace(){
    this.replaced=true;
    return this.replace
  }
  

}

