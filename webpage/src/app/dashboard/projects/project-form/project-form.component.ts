import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  project: Project = {
    name: '',
    description: '',
    typeAllowed: ''
  };
  submitted = false;

  constructor( private projectService: ProjectService,) { }

  ngOnInit() {

  }
    
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
        },
        error => {
          console.log(error);
        });
  }

  newProject(): void {
    this.submitted = false;
    this.project= {
      name: '',
      description: '',
      typeAllowed: ''
    };
  }

}