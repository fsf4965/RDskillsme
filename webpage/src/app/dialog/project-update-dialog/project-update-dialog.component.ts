import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

export interface DialogData {
    name: string;
    description: string;
    typeAllowed: string;
}

@Component({
  selector: 'app-project-update-dialog',
  templateUrl: './project-update-dialog.component.html',
  styleUrls: ['./project-update-dialog.component.css']
})
export class ProjectUpdateDialogComponent implements OnInit {

  updateForm!: FormGroup;
  submitted = false;
  currentProject: Project = {
    name: '',
    description: '',
    typeAllowed: '',
    createdAt:'',
  };

  constructor(
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder) {}

  
  ngOnInit(): void {
    this.currentProject=this.data;

    this.updateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description:[null, [Validators.required]],
      typeAllowed:[null, [Validators.required]],
    });

     //set default value
     this.updateForm.controls["name"].setValue(this.currentProject.name);
     this.updateForm.controls["description"].setValue(this.currentProject.description);    
     this.updateForm.controls["typeAllowed"].setValue(this.currentProject.typeAllowed); 
    
    
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

  //close the dialog box
  onNoClick(): void {
    this.dialogRef.close(0);
  }

  //used for html div ngIf*
  get f() { return this.updateForm.controls; }

  //submit the form
  onSubmit():void {
    this.submitted = true;
   // validate the inputs
    if (this.updateForm.invalid) {
      return;
    }
    //if input is valid, pass the data to project list component
    this.dialogRef.close(this.updateForm.value);
  }
}
