import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DevPro_CommentService } from 'src/app/services/devPro_comment.service';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.css']
})
export class CommentboxComponent implements OnInit {

  commentForm!: FormGroup;
  commentInfo: Array<object> = [];
  newcommentInfo!:Array<object>;
  submitted: Boolean = false;
  public id = 0;
  @Input() devid!:number;
  @Output() usercomment = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
               private devPro_CommentService:DevPro_CommentService,
               private accountDataShareService: AccountDataShareService,
              ) { }

  ngOnInit() {
    this.createForm();
    this.retrieveDevPro_Comment();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.devid);  
    this.createForm();
    this.retrieveDevPro_Comment();

  }
  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  //retrieve all DevPro_Comment, assign it to commentInfo 
  retrieveDevPro_Comment(): void {
    
    this.devPro_CommentService.findBydev_projectId(this.devid)
      .subscribe(
        data => {
          this.commentInfo = data;
          this.usercomment.emit(this.commentInfo);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //submit the comment form
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return false;
    } else {  
      this.newcommentInfo=Object.assign({
      //commentId : this.id++,
      commentTxt: this.commentForm.controls['comment'].value,
      replyComment: [],
      commenterEmail:this.accountDataShareService.viewUserData().email,
      dev_projectId:this.devid,

    })

       // save the comment to the database
      this.devPro_CommentService.create(this.newcommentInfo)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.retrieveDevPro_Comment();
        },
        error => {
          console.log(error);
        });
      return true;
    }
  }


}
