import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing-connexion-page',
  templateUrl: './landing-connexion-page.component.html',
  styleUrls: ['./landing-connexion-page.component.scss']
})
export class LandingConnexionPageComponent implements OnInit {
  signupForm!:FormGroup;
  


  constructor() { }

  ngOnInit(): void {
  }

  //Function onSubmit that will show in the console the value of the email inputted by the user
  onSubmit(form: NgForm): void{ 
    console.log(form.value)
  }

}
