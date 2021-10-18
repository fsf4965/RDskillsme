
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { PostService } from 'src/app/services/post.service';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input()
  viewcomment=false;
  postid?:number;

  currentPost: Post = {
    post_id:'',
    title: '',
    description: '',
    accountId:'',
    createdAt:'',
  };
  message = '';
  isowner=false;
  
  constructor(
    private postService: PostService,
    private accountDataShareService: AccountDataShareService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.message = '';
    this.getAccountType();
    this.getPost(this.route.snapshot.params.id);
  }

  //check if the login user is the post owner
  isOwner(){
    if(this.accountDataShareService.viewUserData().id==this.currentPost.accountId)
    this.isowner=true;
  }

  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }

  //get the current post info
  getPost(id: string): void {
    this.postService.get(id)
      .subscribe(
        data => {
          this.currentPost = data;
          this.isOwner();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //update the post detail
  updatePost(): void {
    this.message = '';
    this.postService.update(this.currentPost.post_id, this.currentPost)
      .subscribe(
        response => {
          console.log(response);
          //this.message = response.message ? response.message : 'This post was updated successfully!';
          //alert("Updated Successfully")
        },
        error => {
          console.log(error);
        });
  }
  //open the project delete dialog box
  openDialogDeletePost(): void {
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.deletePost()
      }
      
    });

  }
  //delete the current post
  deletePost(): void {
    this.postService.delete(this.currentPost.post_id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['../'], {relativeTo: this.route});
          alert("Delete Successfully")

        },
        error => {
          console.log(error);
        });
  }

  //return to post list
  gotoPostsList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  resetForm() {
    this.getPost(this.route.snapshot.params.id);
  }

  viewComments(id:number){
    this.postid=id;
    this.viewcomment=true;
  }

  //like the current project
  addlike(){
    this.currentPost.likes=this.currentPost.likes+1;
    this.updatePost();
  }

  //dislike the current project
  adddislike(){
    this.currentPost.dislikes=this.currentPost.dislikes+1;
    this.updatePost();
  }

}
