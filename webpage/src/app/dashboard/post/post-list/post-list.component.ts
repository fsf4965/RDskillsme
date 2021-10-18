import { AccountDataShareService } from './../../../services/accountDataShare.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit{

  
  posts?: Post[];
  currentPost: Post = {};
  currentIndex = -1;
  name = '';
  submitted = false;
  publishPost=false;

  post: Post = {
    title:'',
    description: '',
    createdAt:'',
  };

  displayedColumns: string[] = ['post_id', 'title', 'description', 'likes','dislikes',];
  dataSource = new MatTableDataSource(this.posts);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private router: Router,
    private accountDataShareService:AccountDataShareService,
    private postService: PostService ) { }

  ngOnInit(): void {
    this.getAccountType();
    this.retrievePosts();

  }
  getAccountType(){
    return this.accountDataShareService.viewUserData().adminAccount;   
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  retrievePosts(): void {
    this.postService.getAll()
      .subscribe(
        data => {
          this.posts = data;
          // table
         this.dataSource = new MatTableDataSource(this.posts);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  // filter columns
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // refresh the post list
  refreshList(): void {
    this.retrievePosts();
    this.currentPost = {};
    this.currentIndex = -1;
  }
 
  //save the post to database
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
           //reload the post list
           this.retrievePosts();
        },
        error => {
          console.log(error);
        });
  }

  //create a new post publish box
  newPost(): void {
    this.submitted = false;
    this.post= {
      title: '',
      description: ''
    };
  }

  //publish a new project button
  showPublish(enable: boolean) {
    this.publishPost=enable;
  }



}