import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-published-posts',
  templateUrl: './published-posts.component.html',
  styleUrls: ['./published-posts.component.scss']
})
export class PublishedPostsComponent implements OnInit {

  commentForm!:FormGroup;

  @Input() post: any; 

  @Output() event = new EventEmitter();
  postTitle!: string;
  postDescription!: string;
  postImageUrl!: string;
  postCreationDate!:string;
  postPostId!:number;
  postUserId!:number;
  postAmountOfLikes!:any;
  hasPostOneLikeOrManyLikes!:string;
  unparsedUserId!: string;
  userId!:number;
  token!:string;

  likedOrUnlikedMessage!:string;

  test: boolean = true;

  commentsArray: any[]= [];


  constructor(private appService: AppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.maxLength(180)]]

  })
    this.unparsedUserId = sessionStorage.getItem("userId") as string;
    this.userId = parseInt(this.unparsedUserId);
    console.log(typeof this.userId);
    console.log("Input post = ", this.post);
    
    this.postTitle = this.post.title;
    this.postDescription = this.post.description;
    this.postImageUrl = this.post.image_url;
    this.postCreationDate = this.post.createdAt;
    this.postPostId = this.post.post_id;
    this.postUserId = this.post.user_id;
    console.log(typeof this.postPostId);
    this.getCommentsInPost();
    this.getLikesInPost(this.postPostId);

    this.token = this.appService.getCookieToken();
  }

  onSubmitComment():void{
    let comment: string = this.commentForm.value.comment;
    console.log(this.commentForm.value);

    this.appService.sendCommentFromPostToBackend(comment, this.postPostId).subscribe(
       (result: any)=>{
        console.log("Le commentaire a été créé avec succès: ", result);
                this.commentsArray.unshift(result);
      },
      (error: any)=>{
        console.log(error)
      }
    );
  }

showModal():void{
  //.showModal 
}

modifyPost():void{
  this.event.emit({
          action: "update",
          data: this.post
        });
}

deletePost():void{
console.log("Post à supprimer with postID = "+this.postPostId);
    console.log("PostID = ",this.postPostId)
this.appService.deletePostToBackend(this.postPostId).subscribe(
   (result: any)=>{
        console.log(result);
        this.event.emit({
          action: "delete",
          data: this.post
        });
        },
      (error: any)=>{
        console.log(error)
      }
)
}

  getCommentsInPost(): void{
    this.appService.getAllCommentsFromPost(this.postPostId).subscribe(
       (result: any)=>{
        this.commentsArray = result;
        console.log("Comment: ", result)

      },
      (error: any)=>{
        console.log(error)
      }
    )
  }


  getLikesInPost(postId: number): void{
    this.appService.getAmountOfLikesInPost(postId).subscribe(
       (result: any)=>{
        let resultAmountOfLikes = result.likes
        console.log("%cLikes: "+ JSON.stringify(result), "background-color: crimson;");
        console.table(resultAmountOfLikes);
        this.postAmountOfLikes = resultAmountOfLikes;
        this.hasPostOneLikeOrManyLikes = resultAmountOfLikes === 1 ? " Like": " Likes";
      },
      (postHasNoLikesError: any)=>{
        console.log(postHasNoLikesError)
      }
    )
  }

  sendLikeToPost(postId:number ,userId: number):void{
    this.appService.likePost(postId, userId).subscribe(
      (result: any)=>{
        console.log("GIVE LIKE TO POST",result);
        this.likedOrUnlikedMessage = result.message;
        if(result.message === "The post has been unliked (-1)"){
          this.postAmountOfLikes--;
          this.hasPostOneLikeOrManyLikes = this.postAmountOfLikes === 1 ? " Like": " Likes";
        }else{
          this.postAmountOfLikes++;
          this.hasPostOneLikeOrManyLikes = this.postAmountOfLikes === 1 ? " Like": " Likes";
        }
      },

      (error: any)=>{
        console.error("ERREUR INTERCEPTÉE LORS DE L'ENVOI DU LIKE AU POST",error.error)
            console.assert(this.unparsedUserId !== null, "Le tableau est vide")
      }
    )
  }

}
