import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, NgForm, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {LandingConnexionPageService} from './landing-connexion-page.service';
import {AppService} from "../app.service";

@Component({
  selector: 'app-landing-connexion-page',
  templateUrl: './landing-connexion-page.component.html',
  styleUrls: ['./landing-connexion-page.component.scss']
})

export class LandingConnexionPageComponent implements OnInit {
  signupForm!: UntypedFormGroup;
  emailRegex!: RegExp;
  passwordRegex!: RegExp;
  isUserAlreadyRegistered: boolean = false;
  isUserSuccessfullyRegistered: boolean = false;
  errorMessage: string = "";
  successfulSignupMessage: string = "";
  
  constructor(private formBuilder: UntypedFormBuilder, private signupResponse: AppService, private router: Router) {}

  ngOnInit(): void {
    this.emailRegex = /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    this.passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    this.signupForm = this.formBuilder.group({
      user_email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      user_password:[null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    });
  }
  
  //Function onSubmit that will show in the console the value of the email and password inputted by the user
  onSubmitForm(): void{ 
    console.log("Bouton cliqué, valeur du formulaire: \n", this.signupForm.value)
    this.signupResponse.sendSignupFormToBackend(this.signupForm.value).subscribe(
      (result: any)=>{
        console.log("%c Résultat: " + JSON.stringify(result.message), "background-color: limegreen");
        this.isUserSuccessfullyRegistered = true;
        this.successfulSignupMessage = result.message;
        setTimeout(
          ()=>{
            this.router.navigateByUrl("/login")
          }, 2500
        )
      },
      
      (error: any)=>{
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
