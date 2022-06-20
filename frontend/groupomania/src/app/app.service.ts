import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http :HttpClient, private cookieService:CookieService) { }

  urlAuthAPI: string = "https://localhost:3000/api/auth";
  

  sendSignupFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire SIGNUP avec le body request APP SERVICE: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/signup", bodyRequest);
  }


  sendLoginFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire LOGIN avec le body request APP SERVICE: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/login", bodyRequest); 
  }

  setCookieToken(token: string): void{
  this.cookieService.set("userToken", token, 1, undefined, undefined, true);
}

getCookieToken():string{
  return this.cookieService.get("userToken");
}

deleteCookieToken():void{
  this.cookieService.delete("userToken");
}
  
urlPostAPI: string = "https://localhost:3000/api/posts";

getAllPostsFromBackend(): Observable<any>{
 return this.http.get(this.urlPostAPI);
}

sendPostToBackend(bodyRequest: object): Observable<object>{
 return this.http.post(this.urlPostAPI ,bodyRequest);
}

getAllCommentsFromPost(postId: number): Observable<object>{
  return this.http.get(`${this.urlPostAPI}/${postId}/comments`)
}

likePost(postId: number): Observable<object>{
  return this.http.post(`${this.urlPostAPI}/${postId}/like`, postId)
}

sortArray(array: any):any{
  
}

}
