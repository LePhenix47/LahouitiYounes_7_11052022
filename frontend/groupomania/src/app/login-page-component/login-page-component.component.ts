import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AppService} from "../app.service";

@Component({
  selector: 'app-login-page-component',
  templateUrl: './login-page-component.component.html',
  styleUrls: ['./login-page-component.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  isUserAlreadyLoggedIn: boolean = false;
  isUserSuccessfullyLoggedIn: boolean = false;
  errorMessage: string = "";
    successfulLoginMessage: string = "";

  constructor(private router: Router,
    private formBuilder: UntypedFormBuilder,
    private loginService: AppService,
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
    
    this.loginService.sendLoginFormToBackend(this.loginForm.value).subscribe(
      (result: any)=>{
        console.log("%c Résultat: " + JSON.stringify(result), "background-color: green; font-size: 16px");
        console.log("JWT → " + result.token);
        let token = result.token;
        let userId = result.user_id;
        this.loginService.setCookieToken(token);
        this.loginService.getCookieToken();
        this.isUserSuccessfullyLoggedIn = true;
        this.successfulLoginMessage = result.message;
        sessionStorage.setItem("userId", JSON.stringify(userId));
        setTimeout(
          ()=>{
            this.router.navigateByUrl("/posts")
          }, 2500
        )
      }, (error: any)=>{
        console.log("Erreur: " + error.message + "\n STATUS: " +  error.status);
        console.log("\n CODE: ", error);
        this.isUserAlreadyLoggedIn = true;
        this.errorMessage = error.error.message;
      }
    );
  }

    restoreInput(): void{
    this.isUserAlreadyLoggedIn = false;
    this.errorMessage = "";
  }
}
