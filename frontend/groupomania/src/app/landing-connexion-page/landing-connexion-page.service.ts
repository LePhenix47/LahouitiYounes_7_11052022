import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingConnexionPageService {

  constructor(private http :HttpClient) { } //On a une varaible locale qui peut être utilisée pour créer une nouvelle instancde de HttpClient

  private urlAuthAPI = "https://localhost:3000/api/auth";

  sendSignupFormToBackend(bodyRequest: object): Observable<object>{
    return this.http.post(this.urlAuthAPI+"/signup", bodyRequest);
  }
}
