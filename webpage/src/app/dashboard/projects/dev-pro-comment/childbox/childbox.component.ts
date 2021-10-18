import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';

@Component({
  selector: 'app-childbox',
  templateUrl: './childbox.component.html',
  styleUrls: ['./childbox.component.css']
})
export class ChildboxComponent implements OnInit {

  childForm!: FormGroup;
  replyComment: Array<object> = [];
  submitted: Boolean = false;
  @Output() userReplycomment = new EventEmitter();
  @Output() deletNo = new EventEmitter();
  @Input() commentNo: any;

  constructor(private formBuilder: FormBuilder, 
              private accountDataShareService: AccountDataShareService,
             ) { }

  ngOnInit() {
    this.createForm();
    console.log('Comment no==>', this.commentNo);
  }

  createForm() {
    this.childForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  
  //submit the comment reply
  onSubmit() {
    this.submitted = true;
    if (this.childForm.invalid) {
      return false;
    } else {
      this.replyComment.push({
        publishDate : new Date(),
        commentTxt: this.childForm.controls['comment'].value,
        commenterEmail:this.accountDataShareService.viewUserData().email,
      });
      this.userReplycomment.emit(this.replyComment);
      this.deletNo.emit(this.commentNo);

      return true;
    }
  }

}
