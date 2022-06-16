import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageServiceService } from './login-page-service.service';

@Component({
  selector: 'app-login-page-component',
  templateUrl: './login-page-component.component.html',
  styleUrls: ['./login-page-component.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isUserAlreadyRegistered: boolean = false;
  errorMessage: string = "";


  constructor(private router: Router, private formBuilder: FormBuilder, private loginResponse: LoginPageServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user_email: [null, [Validators.required]],
      user_password: [null, [Validators.required]]
    });
  }


  onSubmitLoginForm(): void{
    console.log("Bouton cliqué, valeur du formulaire: \n", this.loginForm.value);
    
    this.loginResponse.sendLoginFormToBackend(this.loginForm.value).subscribe(
      (result: any)=>{
        console.log("Résultat: ", result);
        this.router.navigateByUrl('posts');

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
