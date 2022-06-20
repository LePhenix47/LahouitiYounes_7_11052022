import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-posts-page-component',
  templateUrl: './posts-page-component.component.html',
  styleUrls: ['./posts-page-component.component.scss']
})


export class PostsPageComponent implements OnInit {


  postForm! :FormGroup;
  file: any;
  postsArray: any;

  imageUrl: string|undefined = "";


  constructor(private router: Router, private formBuilder: FormBuilder, private appService:  AppService) { }

  ngOnInit(): void {
    this.getPosts();

    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.maxLength(180)]],
      image_url: [null, [Validators.nullValidator]]
    })

  }

  onSubmitPostForm():void{
    
    const postForm = this.postForm.value;

    let formData: FormData = new FormData();

    formData.append("user_id", sessionStorage.getItem("userId") || "0")
    formData.append("title", this.postForm.value.title)
    formData.append("description", this.postForm.value.description)
    formData.append("file", this.file)

    console.log("Valeur du formulaire: ", formData); 
    this.appService.sendPostToBackend(formData).subscribe(
      (result: any)=>{
        console.log(result)
      },
      (error: any)=>{
        console.log(error)
      }
    )
    //Faudra envoyer: user_id, description, description & image?
  }

  getFile(event: any): void{
  console.log(event);
  this.file = event.target.files[0];
  console.log(this.file);
  const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.imageUrl = reader.result?.toString();
    };
}


getPosts():void{
  this.appService.getAllPostsFromBackend().subscribe(
      (result: any)=>{
        let sortedByMostRecent = result.sort((a: any,b :any) => b.post_id - a.post_id);
        console.log("%cSORTED ARRAY BY CREATION DATE" + JSON.stringify(sortedByMostRecent), "font-size: 14px; background: olive");
        this.postsArray = result;
        console.log("Posts: ", result)

      },
      (error: any)=>{
        console.log(error)
      }
  )
}
}
