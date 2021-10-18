
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
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  currentProject: Project = {
    id:'',
    name: '',
    description: '',
    typeAllowed: '',
    createdAt:''
  };

  getCurrentAccountAllDev_Project?: Dev_Project[];

  public currentProjectid!:number;
  message = '';
  editable: boolean = false;
  addtoDev=true;

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
    this.getAccountType();
    //when the login user is admin, he can edit the project detail form
    if(this.getAccountType())
    {
      this.editable=true;
    }
    this.getProject(this.route.snapshot.params.id);
    this.currentProjectid=this.route.snapshot.params.id;
  }

  //get the current login user detail
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }

  //retrieve the current project detail from the database
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

  //update the current project detail
  updateProject(): void {
    this.message = '';
    this.projectService.update(this.currentProject.id, this.currentProject)
      .subscribe(
        response => {
          console.log(response);
         // this.message = response.message ? response.message : 'This project was updated successfully!';
          this.getProject(this.currentProject.id);
          alert("Updated Successfully")
        },
        error => {
          console.log(error);
        });
  }

  //delete the current project detail
  deleteProject(): void {
    this.projectService.delete(this.currentProject.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['../'], {relativeTo: this.route});
          alert("Delete Successfully")
        },
        error => {
          console.log(error);
        });
  }

  //go back to the projeect list page
  gotoProjectsList() {
    const projectId = this.currentProject.id;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  //reset the editing project detail
  resetForm() {
    this.getProject(this.route.snapshot.params.id);
  }

  // add the current project to my dev_project
  addToMy_Dev(){
    //retrieve current user's all dev_project 
     this.dev_projectService.findByCurrentAccountPro(this.accountDataShareService.viewUserData().id)
     .subscribe(
      response => {
        console.log(response);
        this.getCurrentAccountAllDev_Project=response;
        // check if the project has been added before using project id
        for(let one of this.getCurrentAccountAllDev_Project)
        {
          if(one.projectId==this.route.snapshot.params.id)
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
            feedback:'',
            accountId: this.accountDataShareService.viewUserData().id,
            projectId:this.route.snapshot.params.id,
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

  //like the current project
  addlike(){
    this.currentProject.likes=this.currentProject.likes+1;
    this.updateProject();
  }

  //dislike the current project
  adddislike(){
    this.currentProject.dislikes=this.currentProject.dislikes+1;
    this.updateProject();
  }
  // go to the my developing projects page
  goToMy_Dev(){
    this.router.navigate(['../../dev_projects'], {relativeTo: this.route});
  }

  //open the project delete dialog box
  openDialogDeleteProject(): void {
  
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.deleteProject()
      }
      
    });

  }
  
}
