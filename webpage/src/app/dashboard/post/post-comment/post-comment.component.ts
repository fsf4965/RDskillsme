import { Component, Input, OnInit } from '@angular/core';
import { Post_Comment } from 'src/app/models/post_comment.model';


@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit{

  comments!: Post_Comment [];
  count!: number;
  @Input() postid:any;
  
  constructor() { }

  ngOnInit() {
    this.count = 0;
  
  }

//comment box
  receiveComment($event: Post_Comment []) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }
//comment list
  recieveCount($event: Post_Comment []) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}