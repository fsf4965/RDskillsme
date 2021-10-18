import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CompletedProjectsListComponent } from './completed-projects-list/completed-projects-list.component';
import { DevProCommentComponent } from './dev-pro-comment/dev-pro-comment.component';
import { ChildboxComponent } from './dev-pro-comment/childbox/childbox.component';
import { CommentboxComponent } from './dev-pro-comment/commentbox/commentbox.component';
import { CommentsComponent, DatacontainerDirective } from './dev-pro-comment/comments/comments.component';
import { ProjectListAdminComponent } from './project-list-admin/project-list-admin.component';
import { CdkDetailRowDirective } from './directive/cdk-detail-row-directive';


@NgModule({
  declarations: [
    ProjectDetailComponent,
    ProjectFormComponent,
    ProjectListComponent,
    CompletedProjectsListComponent,
    DevProCommentComponent,
    CommentboxComponent,
    CommentsComponent,
    ChildboxComponent,
    DatacontainerDirective,
    ProjectListAdminComponent,
    CdkDetailRowDirective,
    
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    ProjectsRoutingModule
  ],
  exports:[
    MatSortModule,


  ],
  entryComponents: [ChildboxComponent],
})
export class ProjectsModule { }
