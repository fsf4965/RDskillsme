import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDevProjectsRoutingModule } from './my-dev-projects-routing.module';
import { MyDevProjectDetailComponent } from './my-dev-project-detail/my-dev-project-detail.component';
import { MyDevProjectsComponent } from './my-dev-projects.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FeedbackListComponent } from './uploadfiles/feedback-list/feedback-list.component';
import { FeedbackDetailsComponent } from './uploadfiles/feedback-details/feedback-details.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    MyDevProjectDetailComponent,
    MyDevProjectsComponent,
    FeedbackListComponent,
    FeedbackDetailsComponent
  ],
  imports: [
    CommonModule,
    MyDevProjectsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,

  ]
})
export class MyDevProjectsModule { }
