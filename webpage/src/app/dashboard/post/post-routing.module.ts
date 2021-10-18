import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';

const postsRoutes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  { path: ':id', component: PostDetailComponent, data: { animation: 'post' }  },
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
