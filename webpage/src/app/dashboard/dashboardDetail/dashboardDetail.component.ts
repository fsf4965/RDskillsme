import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';

@Component({
  selector: 'app-dashboardDetail',
  templateUrl: './dashboardDetail.component.html',
  styleUrls: ['./dashboardDetail.component.css']
})
export class DashboardDetailComponent implements OnInit {
  lastName!: Observable<string>;
  id!:Observable<string>;
  fullName!:string;
  email?: string;

  constructor(
   private accountDataShareService: AccountDataShareService,
  ) {}

  ngOnInit() {
    this.email=this.accountDataShareService.viewUserData().email;
  }

  getdetail(){
    return this.email;
  }

}