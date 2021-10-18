import { AccountDataShareService } from './../../../services/accountDataShare.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ProjectUpdateDialogComponent } from 'src/app/dialog/project-update-dialog/project-update-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-project-list-admin',
  templateUrl: './project-list-admin.component.html',
  styleUrls: ['./project-list-admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProjectListAdminComponent implements OnInit {

  project: Project = {
    name: '',
    description: '',
    typeAllowed: '',
    createdAt:'',
  };

  updatedproject: Project = {
    name: '',
    description: '',
    typeAllowed: '',
    createdAt:'',
  };

  submitted = false;
  projects?: Project[];
  currentProject: Project = {};
  currentIndex = -1;
  name = '';
  publishProject = false;

  displayedColumns: string[] = ['id', 'name', 'typeAllowed','createdAt','likes','dislikes','edit','delete'];
  dataSource = new MatTableDataSource(this.projects);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  isExpansionDetailRow = (index:any, row:any) => row.hasOwnProperty('detailRow');

  constructor(private projectService: ProjectService,
              private accountDataShareService:AccountDataShareService,
              public dialog: MatDialog, ) 
              { }

  ngOnInit(): void {
    this.getAccountType();
    this.retrieveProjects();

  }

  //get current account login detail
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }

  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //retrieve all projects from the database, display that in mat table
  retrieveProjects(): void {
    this.projectService.getAll()
      .subscribe(
        data => {
          this.projects = data;
          // table
         this.dataSource = new MatTableDataSource(this.projects);
         //columns sorting and pagination
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // filter columns
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // refresh the project list
  refreshList(): void {
    this.retrieveProjects();
    this.currentProject = {};
    this.currentIndex = -1;
  }

  //remove all projects
  removeAllProjects(): void {
    this.projectService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  //save the new project to the database
  saveProject(): void {
    const data = {
      name: this.project.name,
      description: this.project.description,
      typeAllowed: this.project.typeAllowed
    };

    this.projectService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          //reload the project list
          this.retrieveProjects();
        },
        error => {
          console.log(error);
        });
  }

  //create a new project publish box
  newProject(): void {
    this.submitted = false;
    this.project= {
      name: '',
      description: '',
      typeAllowed: ''
    };
  }

  //open the project edit dialog box
  openDialogEditProject(projectid:any,projectname:any, projectdescription:any,projecttypeAllowed:any): void {
  
    const dialogRef = this.dialog.open(ProjectUpdateDialogComponent, {
      width: '250px',
      data: {name: projectname,
        description: projectdescription,
        typeAllowed: projecttypeAllowed}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result!=0){
        this.updatedproject=result;

        this.projectService.update(projectid, this.updatedproject)
        .subscribe(
          response => {
            console.log(response);
          // this.message = response.message ? response.message : 'This project was updated successfully!';
          this.refreshList();
          },
          error => {
            console.log(error);
          });
        }
      
    });
   
  }
  
  //open the project delete dialog box
  openDialogDeleteProject(id:any): void {
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.deleteProject(id)
      }
      
    });

  }

  //delete the current project detail
  deleteProject(id:any): void {
    this.projectService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          alert("Delete Successfully")
        },
        error => {
          console.log(error);
        });
  }

  //update the current project detail
  updateProject(id:any ): void {
    //this.message = '';
    this.projectService.update(id, this.currentProject)
      .subscribe(
        response => {
          console.log(response);
         // this.message = response.message ? response.message : 'This project was updated successfully!';
          //this.getProject(this.currentProject.id);
        },
        error => {
          console.log(error);
        });
  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = project;
    this.currentIndex = index;
  }

//publish a new project button
  showPublish(enable: boolean) {
    this.publishProject=enable;
  }

}