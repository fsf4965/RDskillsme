import { Component, OnInit, Input, Output, OnChanges, EventEmitter,Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver,} from '@angular/core';
import { ChildboxComponent } from '../childbox/childbox.component';
import { Post_CommentService } from 'src/app/services/post_comment.service';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})
export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnChanges{
  //parent to child:get data:postComment from the post-component
  @Input() postComment: Array<any> = [];

  @Input() postid!:number;
  //child to parent: share the countComments data to post-component
  @Output() countComments = new EventEmitter();
  
  public loadComponent = false;
  public commentIndex = 0;
  public reply:Array<any> = [];

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an any that stores
  a list of items. What is special about this any is
  when the state of the application changes Angular will
  automatically update the any items for you. */
  

  
  @ViewChildren(DatacontainerDirective)
  entry!: QueryList<DatacontainerDirective>;

  constructor(private resolver: ComponentFactoryResolver,
    private post_CommentService:Post_CommentService,
    public dialog: MatDialog,
    private accountDataShareService:AccountDataShareService) { }

  ngOnInit() {
  }


  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
  }

  //check if the user is the comment owner
  isowner (post:any){
    if(post.commenterEmail==this.accountDataShareService.viewUserData().email)
    {return true;}

    else return false;
  }

  retrievePost_Comment(): void {
    this.post_CommentService.findBypostId(this.postid)
      .subscribe(
        data => {
          this.postComment = data;
          this.countComments.emit(this.postComment);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  openDialogDeleteComment(no:number): void {
  
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this. removePost_Comment(no);
      }
      
    });
   

  }

  removePost_Comment(no: number) {
    this.post_CommentService.delete(no).subscribe(
      data => {
        console.log(data);
        //confirm

        alert("remove successfully");

       //retrieve the postcomment data from the database
       this.retrievePost_Comment();
        
      },
      error => {
        console.log(error);
      });

   
  }
 
//reply the currrent comment
  replyPost_Comment(postid:any,index: number) {
    this.loadComponent = true;
    //Retrieves the factory object that creates a component of the given type.
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
            data => {
          console.log('Piyali=>', data);
          this.receiveReplyComment(data, postid);
        }
      );
      myRef.instance.deletNo.subscribe(
        (        no: any) => {
          myRef.destroy();
        }
      );
    }
  }
 //receive the comment reply from the childbox component
  receiveReplyComment($event: any[], i: number) {
    this.reply = $event;
    console.log($event);
    this.postComment.forEach((element) => {
      if (element['id'] === i) {
        element['replyComment'].push(...$event);
        console.log('Main array after reply comment=>', element);
        // save the  reply comment to the database
        this.post_CommentService.update(i,element)
        .subscribe(
          response => {
            console.log(response);
            alert("Post Successfully!")
            this.retrievePost_Comment();
            
          },
          error => {
            console.log(error);
          });
        
      }
    });
    this.loadComponent = false;
  }

  jsonDecode(item:any) {
    return JSON.parse(item);
  }

}
