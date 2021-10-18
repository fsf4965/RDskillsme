import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectListComponent } from './project-list/project-list.component';

const projectsRoutes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  { path: ':id', component: ProjectDetailComponent, data: { animation: 'project' }  },
];

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
