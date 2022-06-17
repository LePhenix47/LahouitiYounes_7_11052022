import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageServiceService {

  constructor(private http :HttpClient, private cookieService:CookieService) { }

  urlAuthAPI: string = "https://localhost:3000/api/auth";

    sendLoginFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire LOGIN avec le body request: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/login", bodyRequest); 
  }

  setCookieToken(token: string): void{
  this.cookieService.set("userToken", token, 1, undefined, undefined, true);
}

getCookieToken():string{
  return this.cookieService.get("userToken");
}

deleteCookieToken():void{
  this.cookieService.delete("userToken")
}

}
