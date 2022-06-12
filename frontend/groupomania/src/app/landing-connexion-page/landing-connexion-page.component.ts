import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {LandingConnexionPageService} from './landing-connexion-page.service';

@Component({
  selector: 'app-landing-connexion-page',
  templateUrl: './landing-connexion-page.component.html',
  styleUrls: ['./landing-connexion-page.component.scss']
})

export class LandingConnexionPageComponent implements OnInit {
  signupForm!: FormGroup;
  emailRegex!: RegExp;

  constructor(private formBuilder: FormBuilder, private signupResponse: LandingConnexionPageService) { 
     console.log('signupResponse: ', signupResponse);
  }

  ngOnInit(): void {
    this.emailRegex = /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

    this.signupForm = this.formBuilder.group({
      user_email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      user_password:[null, [Validators.required]],
    });

  }
  
  //Function onSubmit that will show in the console the value of the email and password inputted by the user
  onSubmitForm(): void{ 
    this.signupResponse.sendSignupFormToBackend(this.signupForm.value);
    console.log("Bouton cliqué, valeur du formulaire: \n", this.signupForm.value)
  }

}
