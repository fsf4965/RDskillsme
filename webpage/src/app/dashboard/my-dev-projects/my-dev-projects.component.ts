import { AccountDataShareService } from './../../services/accountDataShare.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Dev_Project } from 'src/app/models/dev_project.model';
import { Dev_ProjectService } from 'src/app/services/dev_project.service';

@Component({
  selector: 'app-my-dev-projects',
  templateUrl: './my-dev-projects.component.html',
  styleUrls: ['./my-dev-projects.component.css']
})
export class MyDevProjectsComponent implements OnInit {

  dev_projects?: Dev_Project[];
  currentDev_Project: Dev_Project = {};
  currentIndex = -1;
  isuploaded = '';

  displayedColumns: string[] = ['id', 'projectName','isuploaded', "uploadfuncion" ];
  dataSource = new MatTableDataSource(this.dev_projects);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dev_projectService: Dev_ProjectService, 
              private route: ActivatedRoute,
              private router: Router, 
              private accountDataShareService :AccountDataShareService) { }

  ngOnInit(): void {
    this.retrieveDev_Projects();
    this.getAccountType();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  //get account login detail
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }

  //retrieve all the dev_project from the database
  retrieveDev_Projects(): void {
    //normal user can only view himself dev_pro detail
    if(!this.getAccountType())
    {
      this.dev_projectService.findByCurrentAccountPro(this.accountDataShareService.viewUserData().id)
      .subscribe(
        data => {
          this.dev_projects = data;
          // table
         this.dataSource = new MatTableDataSource(this.dev_projects);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }
    else{
      this.dev_projectService.getAll()
      .subscribe(
        data => {
          this.dev_projects = data;
          // table
         this.dataSource = new MatTableDataSource(this.dev_projects);
         
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }
    
  }
  //using key word to filter column
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 //refresh the list
  refreshList(): void {
    this.retrieveDev_Projects();
    this.currentDev_Project = {};
    this.currentIndex = -1;
  }


  setActiveDev_Project(dev_project: Dev_Project, index: number): void {
    this.currentDev_Project = dev_project;
    this.currentIndex = index;
  }

  //remove all dev_projects 
  removeAllDev_Projects(): void {
    this.dev_projectService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  //jump to upload files page
  UploadFile(id:any):void{
    //navigate to upload page
    this.router.navigate([id],{relativeTo: this.route});
  }

}