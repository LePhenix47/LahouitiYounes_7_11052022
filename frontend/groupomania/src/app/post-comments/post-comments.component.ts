import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input() comment: any;

  commentComment!: string;
  commentUserId!: number;
  commentEmail!: string;
  commentCommentId!: number;
  removeBackslashQuotesRegex: RegExp = /[\\"]+/g;
  userId: number = parseInt(sessionStorage.getItem('userId') as string);
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    console.log(
      '%cComment' + JSON.stringify(this.comment),
      'background-color: black; color: white;'
    );
    this.commentEmail = this.comment?.user?.user_email;
    this.commentComment = JSON.stringify(this.comment.comment)
      .replace(this.removeBackslashQuotesRegex, '"')
      .slice(1, -1);
    this.commentUserId = this.comment.userUserId;
    this.commentCommentId = this.comment.comment_id;
    console.log(JSON.stringify(this.comment));
  }

  deleteComment(): void {
    console.log('delete comment');
  }
}
