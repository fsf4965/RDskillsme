import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  post: Post = {
    title: '',
    description: '',
    accountId:''
  };
  submitted = false;

  constructor( private postService: PostService,private accountDataShareService:AccountDataShareService) { }

  ngOnInit() {


  }
    
  savePost(): void {
    const data = {
      title: this.post.title,
      description: this.post.description,
      accountId: this.accountDataShareService.viewUserData().id,
    };

    this.postService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newPost(): void {
    this.submitted = false;
    this.post= {
      title: '',
      description: ''
    };
  }

}