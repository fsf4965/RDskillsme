import { MyDevProjectsComponent } from './my-dev-projects.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDevProjectDetailComponent } from './my-dev-project-detail/my-dev-project-detail.component';

const routes: Routes = [
  {
    path: '',
    component:MyDevProjectsComponent,
  },
  { path: ':id', component: MyDevProjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDevProjectsRoutingModule { }
