import { Component } from '@angular/core';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboardHome',
  templateUrl: './dashboardHome.component.html',
  styleUrls: ['./dashboardHome.component.css']
})
export class DashboardHomeComponent {
  email?: string;
  constructor(
    public authService: AuthService,  
    private accountDataShareService: AccountDataShareService,
  ) {
   
  }

  ngOnInit() {
    this.email=this.accountDataShareService.viewUserData().email
    this.getAccountType();
    
  }

  //check if the account is the admin or just normal user
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }

   //log out function
   logout() {
    this.authService.logout();
    
  }
}
