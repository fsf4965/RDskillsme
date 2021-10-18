import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post_CommentService } from 'src/app/services/post_comment.service';

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
  @Output() usercomment = new EventEmitter();
  @Input() postid:any;
  constructor(private formBuilder: FormBuilder,
               private post_CommentService:Post_CommentService,
               private accountDataShareService: AccountDataShareService,
              ) { }

  ngOnInit() {
    this.createForm();
    this.retrievePost_Comment();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
//retrieve all Post_Comment, assign it to commentInfo 
  retrievePost_Comment(): void {
   
    this.post_CommentService.findBypostId(this.postid)
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

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return false;
    } else {  
      
      this.newcommentInfo=Object.assign({
      commentTxt: this.commentForm.controls['comment'].value,
      replyComment: [],
      commenterEmail:this.accountDataShareService.viewUserData().email,
      postId:this.postid,

    })

       // save the comment to the database
      this.post_CommentService.create(this.newcommentInfo)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.retrievePost_Comment();
        },
        error => {
          console.log(error);
        });

      return true;
    }
  }


}
