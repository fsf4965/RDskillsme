import { AccountDataShareService } from './../../services/accountDataShare.service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AccountDialogComponent } from '../../dialog/account-dialog/account-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ActivateDialogComponent } from 'src/app/dialog/activate-dialog/activate-dialog.component';

@Component({
  selector: 'app-account-m',
  templateUrl: './account-m.component.html',
  styleUrls: ['./account-m.component.css']
})
export class AccountMComponent implements OnInit {

  accounts?: Account[];
  currentAccount: Account = {};
  currentIndex = -1;
  newpassword :Account={password:''};
  activated:Account={isactivated:true};


  displayedColumns: string[] = ['id', 'Name', 'email', 'university','prooffile','isactivated','activatefunction','updatefunction','deletefunction'];
  dataSource = new MatTableDataSource(this.accounts);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog,
              private accountService: AccountService,) 
              { }

  ngOnInit(): void {
    this.retrieveAccounts();
  }

  //mat table sort and pagination function
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  //retriece all accounts detail from the database and display that in the mat table
  retrieveAccounts(): void {
    this.accountService.getAll()
      .subscribe(
        data => {
          this.accounts = data;
          // table
          this.dataSource = new MatTableDataSource(this.accounts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //filter function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshList(): void {
    this.retrieveAccounts();
    this.currentAccount = {};
    this.currentIndex = -1;
  }

  //activate account function
  setActiveAccount(account: Account, index: number): void {
    this.currentAccount = account;
    this.currentIndex = index;
  }

  //redet password function
  updateAccount(email:any,data:any): void {
   this.accountService.update(email,data)
    .subscribe(
      response => {
        console.log(response);
        this.retrieveAccounts();
        alert("Update Successfully")
      },
      error => {
        console.log(error);
      });
   }
    
  //delete an account function
  removeAccount(email:any): void {
    this.accountService.delete(email)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
          alert("Delete Successfully")
        },
        error => {
          console.log(error);
        });
  }
  
  //delete all account function
  removeAllAccounts(): void {
    this.accountService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  //open the dialog to activate an account
  openActivateDialog(email:any): void {
    const dialogRef = this.dialog.open(ActivateDialogComponent, {
      width: '250px',
      data: {isactivated: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
       // this.activated=result;
        this.updateAccount(email,this.activated);
      }
      
    });
  }

   //open the dialog to reset password
  openDialog(email:any): void {
  
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '250px',
      data: {password: this.newpassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result!=0){
        this.newpassword=result;
        this.updateAccount(email,this.newpassword);
      }
      
    });
   
  }

 //open the dialog to delete an account
  openDialogDelete(email:any): void {
  
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.removeAccount(email)
      }
      
    });

  }

  
}