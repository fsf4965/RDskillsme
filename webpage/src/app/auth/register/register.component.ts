
import { Component} from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ProofFileService } from 'src/app/services/proof_file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  hide = true;
  submitted = false;
  registerForm!: FormGroup;
  loading=false;
  
  selectedFiles!: FileList;
  currentFileUpload: File|null=null;
  progress: { percentage: number } = { percentage: 0 };
  currentAccountID!:number

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private accountService: AccountService,
              private uploadProofFileService: ProofFileService) 
              { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}')]],
      university:[null],
      confirmPassword: [null, Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword'),
      adminAccount:false
      
    });
  }
  //used for html div ngIf*
  get f() { return this.registerForm.controls; }

  //upload student proof files function
  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
  handleFileInput(files: FileList) {
    this.currentFileUpload = files.item(0);
  }
  upload(id:Number) {
    this.progress.percentage = 0;
    this.currentFileUpload =this.selectedFiles.item(0);
    this.uploadProofFileService.pushFileToStorage(this.currentFileUpload!,id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
       // alert("file upload successfully");
       alert('SUCCESS!! :-)\n\n' )
           
      } else if (event instanceof HttpResponse) {
        console.log('Your file has been uploaded!');
      }
    });

  }

  //submit the register form to database
  onSubmit():void {
  
    this.submitted = true;
   // validate the inputs
    if (this.registerForm.invalid) {
      return;
    }
   // check if the email has been registered
    this.accountService.get(this.registerForm.value.email)
    .subscribe(
      response=>{
        console.log(response);
        //dbemail: email in database, inemail: user input email
        var dbemail=JSON.stringify(response.email);
        var inemail='"'+this.registerForm.value.email+'"';
        //compare the dbemail and inemail. check if the database has such account
        if(dbemail!=inemail){
                /*if registered successfully, 
          1)automatically generate an user id number and */

          //no such account, create a new account using the user input form value, store the user data to account table, and store the file data to the prooffile table 
          this.accountService.create(this.registerForm.value)
          .subscribe(
            response=>{
              console.log(response);
              this.currentAccountID=response.id;

              //upload proof file to database
              this.upload(this.currentAccountID);
              //jump to registersucess page
              this.router.navigateByUrl('/registersuccess');
            },
            error=>{
              console.log(error);
            }
          );

      }//the user input email has been registered
        else{ alert('This email has been registered. Please login or use another email to register.');}
      },
      error=>{
        console.log(error);
      }  
    );
  }
}

