import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http :HttpClient, private cookieService:CookieService) { }
  setCookieToken(token: string): void{
  this.cookieService.set("userToken", token, 1, "/", 'localhost', true, "Strict");
  }
  
  getCookieToken():string{
  return this.cookieService.get("userToken");
  }
  
  deleteCookieToken():void{
  this.cookieService.delete("userToken");
  }

headers= new HttpHeaders().set('Authorization', `Bearer ${this.getCookieToken()}`);


  urlAuthAPI: string = "https://localhost:3000/api/auth";
  

  sendSignupFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire SIGNUP avec le body request APP SERVICE: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/signup", bodyRequest,{"headers": this.headers});
  }


  sendLoginFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire LOGIN avec le body request APP SERVICE: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/login", bodyRequest,{"headers": this.headers}); 
  }




  //Service des posts
urlPostAPI: string = "https://localhost:3000/api/posts";

getAllPostsFromBackend(): Observable<any>{
 return this.http.get(this.urlPostAPI,{"headers": this.headers});
}

sendPostToBackend(bodyRequest: object): Observable<object>{
    console.log(`Requête en cours pour la création du post avec comme corps de requête  ${JSON.stringify(bodyRequest)}`)

 return this.http.post(this.urlPostAPI ,bodyRequest,{"headers": this.headers});
}

getAllCommentsFromPost(postId: number): Observable<object>{
    console.log(`Requête en cours pour le post avec ID = ${postId} de l'utilisateur`)

  return this.http.get(`${this.urlPostAPI}/${postId}/comments`,{"headers": this.headers})
}

sendCommentFromPostToBackend(commentInPost: string, postId:number):Observable<object>{
  let bodyRequest = {
    user_id: parseInt(sessionStorage.getItem("userId") as string),
    comment: commentInPost
  } 
  console.log()
  return this.http.post(`${this.urlPostAPI}/${postId}/comments`, bodyRequest,{"headers": this.headers})
}

likePost(postId: number, userId: number): Observable<object>{
  console.log(`Requête en cours pour le post avec ID = ${postId}  de type ${typeof postId} de l'utilisateur avec un ID = ${userId} de type ${typeof userId}`)
  let bodyRequest={
    user_id: userId,
  }

  return this.http.post(`${this.urlPostAPI}/${postId}/like`, bodyRequest,{"headers": this.headers})
}

getAmountOfLikesInPost(postId: number): Observable<object>{
  return this.http.get(`${this.urlPostAPI}/${postId}/like`,{"headers": this.headers})
}

}
