import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailSettingsComponent } from './detailSettings/detailSettings.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDetailComponent } from './dashboardDetail/dashboardDetail.component';
import { DashboardHomeComponent } from './dashboardHome/dashboardHome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AccountMComponent } from './account-m/account-m.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountDialogComponent } from '../dialog/account-dialog/account-dialog.component';
import { ActivateDialogComponent } from '../dialog/activate-dialog/activate-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { ProjectUpdateDialogComponent } from '../dialog/project-update-dialog/project-update-dialog.component';

@NgModule({
  declarations: [
   DashboardDetailComponent,
   DashboardHomeComponent,
   DetailSettingsComponent,
   AccountMComponent,
   AccountDialogComponent,
   DeleteDialogComponent,
   ActivateDialogComponent,
   ProjectUpdateDialogComponent,
   
  ],
  entryComponents: [
    AccountDialogComponent,
    DeleteDialogComponent,
    ActivateDialogComponent,
    ProjectUpdateDialogComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatCheckboxModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  
  exports:[
    DashboardDetailComponent,
    DashboardHomeComponent,
    DetailSettingsComponent,
  ]
})
export class DashboardModule {}
