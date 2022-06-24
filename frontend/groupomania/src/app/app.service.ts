import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  setCookieToken(token: string): void {
    this.cookieService.set(
      'userToken',
      token,
      1,
      '/',
      'localhost',
      true,
      'Strict'
    );
  }

  getCookieToken(): string {
    return this.cookieService.get('userToken');
  }

  headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.getCookieToken()}`
  );
  deleteCookieToken(): void {
    this.cookieService.delete('userToken');
  }

  urlAuthAPI: string = 'https://localhost:3000/api/auth';

  sendSignupFormToBackend(bodyRequest: object): Observable<object> {
    console.log(
      "Tentative d'envoi du formulaire SIGNUP avec le body request APP SERVICE: " +
        JSON.stringify(bodyRequest)
    );
    return this.http.post(this.urlAuthAPI + '/signup', bodyRequest);
  }

  sendLoginFormToBackend(bodyRequest: object): Observable<object> {
    console.log(
      "Tentative d'envoi du formulaire LOGIN avec le body request APP SERVICE: " +
        JSON.stringify(bodyRequest)
    );
    return this.http.post(this.urlAuthAPI + '/login', bodyRequest);
  }

  sendAdminLoginFormToBackend(bodyRequest: object): Observable<object> {
    return this.http.post(this.urlAuthAPI + '/login/mod', bodyRequest, {
      headers: this.headers,
    });
  }

  //Service des posts
  urlPostAPI: string = 'https://localhost:3000/api/posts';

  /*
// Recovers all the posts stocked in the DB
*/
  getAllPostsFromBackend(): Observable<any> {
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.get(this.urlPostAPI, { headers: headerRequest });
  }

  /*
// Sends a post and creates it in the DB
*/
  sendPostToBackend(bodyRequest: object): Observable<object> {
    console.log(
      `Requête en cours pour la création du post avec comme corps de requête  ${JSON.stringify(
        bodyRequest
      )}`
    );

    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );

    return this.http.post(this.urlPostAPI, bodyRequest, {
      headers: headerRequest,
    });
  }

  /*
// Updates the title, description or image of a post
*/
  updatePostToBackend(bodyRequest: object, postId: number): Observable<object> {
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.put(this.urlPostAPI + '/' + postId, bodyRequest, {
      headers: headerRequest,
    });
  }

  /*
// Deletes entirely a post
*/
  deletePostToBackend(postId: number): Observable<object> {
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.delete(this.urlPostAPI + '/' + postId, {
      headers: headerRequest,
    });
  }

  /*
// Recovers all the comments of a particular post
*/
  getAllCommentsFromPost(postId: number): Observable<object> {
    console.log(
      `Requête en cours pour le post avec ID = ${postId} de l'utilisateur`
    );
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );

    return this.http.get(`${this.urlPostAPI}/${postId}/comments`, {
      headers: headerRequest,
    });
  }

  /*
// Creates a new comment of a post
*/
  sendCommentFromPostToBackend(
    commentInPost: string,
    postId: number
  ): Observable<object> {
    let bodyRequest = {
      user_id: parseInt(sessionStorage.getItem('userId') as string),
      comment: commentInPost,
    };
    console.log();
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.post(
      `${this.urlPostAPI}/${postId}/comments`,
      bodyRequest,
      { headers: headerRequest }
    );
  }

  /*
//Updates the comment
*/
  updateCommentToBackend(
    bodyRequest: object,
    postId: number,
    commentId: number
  ): Observable<object> {
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.put(this.urlPostAPI + '/' + postId, bodyRequest, {
      headers: headerRequest,
    });
  }

  /*
//Deletes the comment from the post
*/
  deleteCommentToBackend(
    postId: number,
    commentId: number
  ): Observable<object> {
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.delete(
      this.urlPostAPI + '/' + postId + '/comments/' + commentId,
      {
        headers: headerRequest,
      }
    );
  }

  /*
//Likes or unlikes a post
*/
  likePost(postId: number, userId: number): Observable<object> {
    console.log(
      `Requête en cours pour le post avec ID = ${postId}  de type ${typeof postId} de l'utilisateur avec un ID = ${userId} de type ${typeof userId}`
    );
    let bodyRequest = {
      user_id: userId,
    };

    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.post(`${this.urlPostAPI}/${postId}/like`, bodyRequest, {
      headers: headerRequest,
    });
  }

  /*
//Recovers the amount of likes in a post from the DB
*/
  getAmountOfLikesInPost(postId: number): Observable<object> {
    let headerRequest = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getCookieToken()}`
    );
    return this.http.get(`${this.urlPostAPI}/${postId}/like`, {
      headers: headerRequest,
    });
  }
}
