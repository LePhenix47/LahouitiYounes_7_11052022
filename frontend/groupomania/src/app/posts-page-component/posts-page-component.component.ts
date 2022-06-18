import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-page-component',
  templateUrl: './posts-page-component.component.html',
  styleUrls: ['./posts-page-component.component.scss']
})
export class PostsPageComponent implements OnInit {

  postForm! :FormGroup;
  imagePreview$ !:Observable<any>;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.maxLength(180)]],
      image_url: [null, [Validators.nullValidator]]
    })

    this.imagePreview$ = this.postForm.valueChanges.pipe(
      map(
        (value: any)=>{console.log(value)}
      )
    );
  }

  onSubmitPostForm():void{
    console.log(this.postForm.value); 

    //Faudra envoyer: user_id, title, description & image?
  }
}
