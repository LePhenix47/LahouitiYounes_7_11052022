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

  test: boolean = true;

  commentsArray: any;


  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getCommentsInPost();
    console.log("Input post = ", this.post);

    this.postTitle = this.post.title;
    this.postDescription = this.post.description;
    this.postImageUrl = this.post.image_url;
    this.postCreationDate = this.post.createdAt;
    this.postPostId = this.post.post_id;
    this.postUserId = this.post.user_id;
  }

  getCommentsInPost(): void{
    this.appService.getAllCommentsFromPost(11).subscribe(
       (result: any)=>{
        this.commentsArray = result;
        console.log("Comment: ", result)

      },
      (error: any)=>{
        console.log(error)
      }
    )
  }

}
