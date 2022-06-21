import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-published-posts',
  templateUrl: './published-posts.component.html',
  styleUrls: ['./published-posts.component.scss']
})
export class PublishedPostsComponent implements OnInit {

  @Input() post: any; 
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

  test: boolean = true;

  commentsArray: any;


  constructor(private appService: AppService) { }

  ngOnInit(): void {
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
        this.postAmountOfLikes++;
      },

      (error: any)=>{
        console.error("ERREUR INTERCEPTÉE LORS DE L'ENVOI DU LIKE AU POST",error.error)
            console.assert(this.unparsedUserId !== null, "Le tableau est vide")
      }
    )
  }

}
