import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


import { LoginPageServiceService } from './login-page-service.service';
import {AppService} from "../app.service";

@Component({
  selector: 'app-login-page-component',
  templateUrl: './login-page-component.component.html',
  styleUrls: ['./login-page-component.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  isUserAlreadyRegistered: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router,
    private formBuilder: UntypedFormBuilder,
    private AppService: LoginPageServiceService,

    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user_email: [null, [Validators.required]],
      user_password: [null, [Validators.required]]
    });
  }


  onSubmitLoginForm(): void{
        console.log("%c URL: " + this.router.url, "background-color: crimson; font-size: 16px;");

    console.log("Bouton cliqué, valeur du formulaire: \n", this.loginForm.value);
    
    this.AppService.sendLoginFormToBackend(this.loginForm.value).subscribe(
      (result: any)=>{
        console.log("%c Résultat: " + JSON.stringify(result), "background-color: green; font-size: 16px");
        console.log("JWT → " + result.token);
        let token = result.token;
        this.AppService.setCookieToken(token);
        this.AppService.getCookieToken();
        this.router.navigateByUrl('/posts');

      }, (error: any)=>{
        console.log("Erreur: " + error.message + "\n STATUS: " +  error.status);
        console.log("\n CODE: ", error);
        this.isUserAlreadyRegistered = true;
        this.errorMessage = error.error.message;
      }
    );
  }

    restoreInput(): void{
    this.isUserAlreadyRegistered = false;
    this.errorMessage = "";
  }
}
