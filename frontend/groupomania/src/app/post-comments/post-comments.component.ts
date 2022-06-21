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
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.commentComment = JSON.stringify(this.comment.comment);
    this.commentUserId = this.comment.userUserId;
    console.log(JSON.stringify  (this.comment))
  }

}
