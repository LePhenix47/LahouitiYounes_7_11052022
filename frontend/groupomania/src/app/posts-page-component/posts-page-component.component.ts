import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-page-component',
  templateUrl: './posts-page-component.component.html',
  styleUrls: ['./posts-page-component.component.scss']
})
export class PostsPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
