import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AccountDataShareService } from './services/accountDataShare.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  email:string | undefined;
  logout=false;
  constructor(private accountDataShareService:AccountDataShareService,private authService:AuthService,private router:Router) {}
url='';

isValid(): boolean {
  switch(this.router.url){
    case '/login':
      return true;
    case '/about':
      return true;
    case '/contact':
      return true;
  default:
    return false;
  }
}

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
  geturl(){
    this.email=this.accountDataShareService.userData.email;
  this.url = `/${this.email}/dashboard`;
    return this.router.navigate([this.url]);;

  }
  LoginLogout(enable: boolean) {
    this.logout = enable;

    if (enable) {
      this.authService.logout;
    }
  }
}
