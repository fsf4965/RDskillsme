import { AccountDataShareService } from './../../../services/accountDataShare.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Dev_Project } from 'src/app/models/dev_project.model';
import { ProjectService } from 'src/app/services/project.service';
import { Dev_ProjectService } from 'src/app/services/dev_project.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
   animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectListComponent implements OnInit, AfterViewInit{

  project: Project = {
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
  addtoDev=true;
  getCurrentAccountAllDev_Project?: Dev_Project[];

  displayedColumns: string[] = ['id', 'name', 'typeAllowed','createdAt','likes','dislikes','viewShowcase','join'];
  dataSource = new MatTableDataSource(this.projects);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  isExpansionDetailRow = (index:any, row:any) => row.hasOwnProperty('detailRow');
  
  constructor(private projectService: ProjectService,
              private accountDataShareService:AccountDataShareService,
               private dev_projectService: Dev_ProjectService, ) 
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

  // add the current project to my dev_project
  addToMy_Dev(id:any,name:any){
    //retrieve current user's all dev_project 
     this.dev_projectService.findByCurrentAccountPro(this.accountDataShareService.viewUserData().id)
     .subscribe(
      response => {
        console.log(response);
        this.getCurrentAccountAllDev_Project=response;
        // check if the project has been added before using project id
        for(let one of this.getCurrentAccountAllDev_Project)
        {
          if(one.projectId==id)
          {
            this.addtoDev=false;
            break;
          }
        }
        
        if(this.addtoDev==false)
        {
          alert("Fail to add! You have joined this project")
        }
        else{
          //add to the dev_project table
          const data = {
            isuploaded:false,
            accountId: this.accountDataShareService.viewUserData().id,
            projectId: id,
            projectName: name,
            accountEmail: this.accountDataShareService.viewUserData().email,
          };
      
          this.dev_projectService.create(data)
            .subscribe(
              response => {
                console.log(response);
                alert("Added to 'My Developing Project'")
              },
              error => {
                console.log(error);
              });
        
        }
        
      },
      error => {
        console.log(error);
      });

  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = project;
    this.currentIndex = index;
  }

//show publish a new project button
  showPublish(enable: boolean) {
    this.publishProject=enable;
  }


}