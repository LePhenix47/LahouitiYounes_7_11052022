import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-posts-page-component',
  templateUrl: './posts-page-component.component.html',
  styleUrls: ['./posts-page-component.component.scss'],
})
export class PostsPageComponent implements OnInit {
  id: number = 0;
  file: any;
  postsArray: any;
  title: string = '';
  description: string = '';

  imageUrl: string | undefined = '';

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  reset(): void {
    this.title = '';
    this.description = '';
    this.id = 0;
    this.imageUrl = undefined;
    this.file = undefined;
  }

  onSubmitForm(): void {
    let formData: FormData = new FormData();

    formData.append('user_id', sessionStorage.getItem('userId') || '0');
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('file', this.file);

    console.log('Valeur du formulaire: ', formData);
    if (this.id && this.id > 0) {
      console.log('ID =', this.id);
      formData.append('image_url', this.imageUrl ?? '');
      this.appService.updatePostToBackend(formData, this.id).subscribe(
        (result: any) => {
          console.log(result);
          let index = this.postsArray.findIndex((post: any) => {
            return post.post_id === this.id;
          });
          if (index > -1) {
            this.postsArray[index] = result;
          }
          this.reset();
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.appService.sendPostToBackend(formData).subscribe(
        (result: any) => {
          console.log(result);
          this.postsArray.unshift(result);
          this.reset();
        },
        (error: any) => {
          console.log(error);
        }
      );
      //Faudra envoyer: user_id, description, description & image?
    }
  }

  getFile(event: any): void {
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.imageUrl = reader.result?.toString();
    };
  }

  labelFunction(): void {
    let newInput = document.createElement('input') as HTMLInputElement;
    newInput.type = 'file';
    newInput.onchange = (_) => {
      // @ts-ignore
      let files = Array.from(newInput.files);

      this.file = files[0];
      console.log(this.file);
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageUrl = reader.result?.toString();
      };
    };

    newInput.click();
  }

  getPosts(): void {
    this.appService.getAllPostsFromBackend().subscribe(
      (result: any) => {
        let sortedByMostRecent = result.sort(
          (a: any, b: any) => b.post_id - a.post_id
        );
        console.log(
          '%cSORTED ARRAY BY CREATION DATE' +
            JSON.stringify(sortedByMostRecent),
          'font-size: 14px; background: olive'
        );
        this.postsArray = result;
        console.log('Posts: ', result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deletePostVisually(event: any): void {
    console.log('EVENT: ' + event);
    const index = this.postsArray.findIndex((post: any) => {
      return post.post_id === event.data.post_id;
    });
    console.log(index);
    if (index > -1) {
      this.postsArray.splice(index, 1);
    }
  }

  updatePostVisually(event: any): void {
    this.title = event.data.title;
    this.description = event.data.description;
    this.id = event.data.post_id;
    this.imageUrl = event.data.image_url;
  }

  onRequestReceive(event: any): void {
    if (event.action === 'delete') {
      this.deletePostVisually(event);
    } else if (event.action === 'update') {
      this.updatePostVisually(event);
    }
  }
}
