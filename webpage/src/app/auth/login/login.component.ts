import { Component,OnInit } from '@angular/core';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  hide = true;
  submitted = false;
  loginForm!: FormGroup;
  loading = false;
 respnseDetail='';

 currentAccount: Account = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  university: '',
  adminAccount:false,
};

  constructor(public authService: AuthService, public router: Router,private formBuilder: FormBuilder,
    private accountService: AccountService, 
    private accountDataShareService: AccountDataShareService) {
    this.message = this.getMessage();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]]
    });
  }

   //used for html div ngIf*
  get f() { return this.loginForm.controls; }
  
  //submit the login form
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.login()

  }

  //check if lgoin status
  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  // retrieve data from the database
  login() {
    this.accountService.get(this.loginForm.value.email)
    .subscribe(
      response=>{
       this.currentAccount=response;
        console.log(response);
        // store in shareservice, so that we can view the login detail in settings
        this.accountDataShareService.logUserData(response);

        var dbemail=JSON.stringify(response.email);
        var inemail='"'+this.loginForm.value.email+'"';
        //if has such account
        if(dbemail==inemail){
          //check the activate status
          var isactivated=JSON.stringify(response.isactivated);
          //console.log(isactivated)
          if(isactivated=='true'){
          // check the password
          var dbpsw=JSON.stringify(response.password);
          var inpsw='"'+this.loginForm.value.password+'"';
          //if(bcrypt.compare(inpsw, dbpsw)){
            if(inpsw==dbpsw){
            alert('SUCCESS!! :-)\n\n' + 'Welcome '+JSON.stringify(response.lastName))
           // this.router.navigateByUrl(`${this.loginForm.value.email}/dashboardpage`);

           this.message = 'Trying to log in ...';

           //set the login status to "in"
           this.authService.login().subscribe(() => {
             this.message = this.getMessage();
             if (this.authService.isLoggedIn) {
               //login successfully, jump to dashboard page
               const redirectUrl = `${this.loginForm.value.email}/dashboard`;
               // Set our navigation extras object
               // that passes on our global query params and fragment
               const navigationExtras: NavigationExtras = {
                 queryParamsHandling: 'preserve',
                 preserveFragment: true
               };

               this.router.navigate([redirectUrl], navigationExtras);
             }
           });
          }
          // if password is wrong
          else {
            alert('Your password is wrong! Please try again!');
          }

        }
        // if the account has not been activated
        else{ alert('Your account has not been activated! Please try it later!');}
       }//no such account-not register
        else{ alert('No such account');}
      },
      error=>{
        console.log(error);
      }  
    );
  }

  //log out function
  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}
