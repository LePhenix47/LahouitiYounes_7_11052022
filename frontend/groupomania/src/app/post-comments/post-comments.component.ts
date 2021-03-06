import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input() comment: any;
  @Input() postId: any;
  @Output() event = new EventEmitter();

  commentComment!: string;
  commentUserId!: number;
  commentEmail!: string;
  commentCommentId!: number;
  removeBackslashQuotesRegex: RegExp = /[\\"]+/g;
  userId: number = parseInt(sessionStorage.getItem('userId') as string);
  displayButton = false;
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
    let isUserAdmin = JSON.parse(sessionStorage.getItem('bruh') as string);
    this.displayButton = this.userId === this.commentUserId || isUserAdmin;
  }

  deleteComment(): void {
    console.log(
      'delete comment du post w/ ID = ' +
        this.postId +
        ' et comment ID = ' +
        this.commentCommentId
    );
    let idOfComment = this.comment.comment_id;
    console.log(idOfComment);
    this.appService.deleteCommentToBackend(this.postId, idOfComment).subscribe(
      (result: any) => {
        console.log(result);
        this.event.emit({
          action: 'delete',
          data: this.comment,
        });
      },
      (error: any) => {
        console.error(error.error);
      }
    );
  }
}
