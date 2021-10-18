import { Component, Input,  OnInit } from '@angular/core';
import { DevPro_Comment } from 'src/app/models/devPro_comment.model';


@Component({
  selector: 'app-dev-pro-comment',
  templateUrl: './dev-pro-comment.component.html',
  styleUrls: ['./dev-pro-comment.component.css']
})
export class DevProCommentComponent implements OnInit{

  comments!: DevPro_Comment [];
  count!: number;
  //get the file id from the completed-project-list component
  @Input() dev_projectid:any;
  
  constructor() { }

  ngOnInit() {
    this.count = 0;
  
  }
 

  //receive the comments from the comment box
  receiveComment($event: DevPro_Comment []) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  //receive the comments from the comment list
  recieveCount($event: DevPro_Comment []) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}