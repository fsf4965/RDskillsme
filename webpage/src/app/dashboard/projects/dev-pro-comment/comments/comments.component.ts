import { AccountDataShareService } from 'src/app/services/accountDataShare.service';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter,Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit} from '@angular/core';
import { ChildboxComponent } from '../childbox/childbox.component';
import { DevPro_CommentService } from 'src/app/services/devPro_comment.service';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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

  //parent to child:get data:postComment from the dev-pro-component
  @Input() postComment: Array<any> = [];
  @Input() devid!:number;

  //child to parent: share the countComments data to dev-pro-component
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
    private devPro_CommentService:DevPro_CommentService,
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

  //retrieve all comments related to the current file from the database
  retrieveDevPro_Comment(): void {
    this.devPro_CommentService.findBydev_projectId(this.devid)
      .subscribe(
        data => {
          this.postComment = data;
          this.countComments.emit(this.postComment);
          //this.usercomment.emit(this.commentInfo);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  //open the comment delte dialog box
  openDialogDeleteComment(no:number): void {
  
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("data returned from mat-dialog-close is ",result);
      if(result){
        this.removeDevPro_Comment(no);
      }
      
    });

  }

  //remove the comment
  removeDevPro_Comment(no: number) {
    this.devPro_CommentService.delete(no).subscribe(
      data => {
        console.log(data);
        //confirm
        alert("remove successfully");
       //retrieve the postcomment data from the database
       this.retrieveDevPro_Comment();
        
      },
      error => {
        console.log(error);
      });

  }
 
//reply the currrent comment
  replyDevPro_Comment(postid: number,index:number) {
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
        this.devPro_CommentService.update(i,element)
        .subscribe(
          response => {
            console.log(response);
            alert("Post Successfully!")
            this.retrieveDevPro_Comment();
            
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
