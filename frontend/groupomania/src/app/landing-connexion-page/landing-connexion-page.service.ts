import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingConnexionPageService {

  constructor(private http :HttpClient) { } //On a une varaible locale qui peut être utilisée pour créer une nouvelle instancde de HttpClient

urlAuthAPI: string = "https://localhost:3000/api/auth";

  sendSignupFormToBackend(bodyRequest: object): Observable<object>{
    console.log("Tentative d'envoi du formulaire avec le body request: " + JSON.stringify(bodyRequest));
    return this.http.post(this.urlAuthAPI + "/signup", bodyRequest);
  }
}
