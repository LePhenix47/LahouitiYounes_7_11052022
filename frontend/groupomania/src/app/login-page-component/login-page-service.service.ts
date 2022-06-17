import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginPageServiceService {

  constructor(private http :HttpClient) { }

  urlAuthAPI: string = "https://localhost:3000/api/auth";

    sendLoginFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire LOGIN avec le body request: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/login", bodyRequest); 
  }


}
