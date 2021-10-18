import { UploadFile } from './../../../models/file.model';
import { AccountDataShareService } from './../../../services/accountDataShare.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Dev_Project } from 'src/app/models/dev_project.model';
import { Dev_ProjectService } from 'src/app/services/dev_project.service';
import { FeedbackFileService } from 'src/app/services/feedback_file.service';
import { MatDialog} from '@angular/material/dialog'
import { FeedbackUploadDialogComponent } from 'src/app/dialog/feedback-upload-dialog/feedback-upload-dialog.component';

@Component({
  selector: 'app-completed-projects-list',
  templateUrl: './completed-projects-list.component.html',
  styleUrls: ['./completed-projects-list.component.css']
})
export class CompletedProjectsListComponent implements OnInit, AfterViewInit{
  
  //get the current project id from the project detail component
  @Input()
  projectID!: number;

  dev_projects?: Dev_Project[];
  file?:UploadFile[];
  files?:UploadFile[];
  currentDev_Project: Dev_Project = {};
  currentIndex = -1;
  isuploaded = '';
  viewcomment=false;
  dev_projectId?:number;

  selectedFiles!: FileList;
  currentFileUpload: File|null=null;
  progress: { percentage: number } = { percentage: 0 };
  currentDev_ProjectID!:number
  

  displayedColumns: string[] = ['id', 'filename','publisher', 'downloads', 'uploads','comments'];
  dataSource = new MatTableDataSource(this.files);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private dev_projectService: Dev_ProjectService,
    private accountDataShareService:AccountDataShareService,
    public dialog: MatDialog,
     ) { }

  ngOnInit(): void {
    this.getAccountType();
    this.retrieveDev_Projects();
  }

  //get the current user login detail
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //filter columns
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //retrieve all the dev_pro related to the current project id
  retrieveDev_Projects(): void {
    //console.log(this.projectID)
    this.dev_projectService.findByCurrentprojectId(this.projectID)
    .subscribe(
      data => {
        this.dev_projects = data;
        console.log(data);
        this.dataSource=new MatTableDataSource( this.dev_projects)
       
      },
      error => {
        console.log(error);
      });
    
  }

  // view comments related to the clicked dev_pro
  viewComments(id:number){
    this.dev_projectId=id;
    this.viewcomment=true;
    //console.log(this.dev_projectId)
  }

  //refresh the completed dev_pro list
  refreshList(): void {
    this.retrieveDev_Projects();
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }

  handleFileInput(files: FileList) {
    this.currentFileUpload = files.item(0);
  }

  upload(id:any) {
    const dialogRef = this.dialog.open(FeedbackUploadDialogComponent, {
      width: '250px',
      data: {dev_proId: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }
}