import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-published-posts',
  templateUrl: './published-posts.component.html',
  styleUrls: ['./published-posts.component.scss']
})
export class PublishedPostsComponent implements OnInit {

  @Input() post: any; 


  commentsArray: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getCommentsInPost();
  }

  getCommentsInPost(): void{
    this.appService.getAllCommentsFromPost(11).subscribe(
       (result: any)=>{
        this.commentsArray = result;

      },
      (error: any)=>{
        console.log(error)
      }
    )
  }

}
