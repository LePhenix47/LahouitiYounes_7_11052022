import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  @Input() comment: any; 

commentComment!:string;
commentUserId!:number;
commentEmail!:string;
removeBackslashQuotesRegex: RegExp = /[\\"]+/g;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.commentEmail = this.comment?.user?.user_email;
    this.commentComment = JSON.stringify(this.comment.comment).replace(this.removeBackslashQuotesRegex, '"').slice(1, -1);
    this.commentUserId = this.comment.userUserId;
    console.log(JSON.stringify(this.comment))
  }

}
