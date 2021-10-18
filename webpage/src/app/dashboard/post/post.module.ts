import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListComponent } from './post-list/post-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { ChildboxComponent } from './post-comment/childbox/childbox.component';
import { CommentboxComponent } from './post-comment/commentbox/commentbox.component';
import { CommentsComponent, DatacontainerDirective } from './post-comment/comments/comments.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PostDetailComponent,
    PostFormComponent,
    PostListComponent,
    PostCommentComponent,
    CommentboxComponent,
    CommentsComponent,
    ChildboxComponent,
    DatacontainerDirective
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
    PostRoutingModule
  ],
  exports:[
    MatSortModule,


  ],
  entryComponents: [ChildboxComponent],
})
export class PostModule { }