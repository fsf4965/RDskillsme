import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboardHome/dashboardHome.component';
import { DashboardDetailComponent } from './dashboardDetail/dashboardDetail.component';
import { DetailSettingsComponent } from './detailSettings/detailSettings.component';
import { AuthGuard } from '../auth/auth.guard';
import { AccountMComponent } from './account-m/account-m.component';
import { ProjectListAdminComponent } from './projects/project-list-admin/project-list-admin.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'settings', component:DetailSettingsComponent },
          { path: 'accounts', component:AccountMComponent },
          { path: 'dev_projects', loadChildren: () => import('./my-dev-projects/my-dev-projects.module').then(m => m.MyDevProjectsModule),},
          { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),},
          { path: 'projectsAdmin', component:ProjectListAdminComponent},
          { path: 'posts', loadChildren: () => import('./post/post.module').then(m => m.PostModule),},
          { path: '', component: DashboardDetailComponent        },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
