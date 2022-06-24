import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss'],
})
export class AdminLoginPageComponent implements OnInit {
  loginModForm!: FormGroup;
  formIsIncorrect: boolean = false;
  isUserSuccessfullyLoggedIn: boolean = false;
  errorMessage: string = '';
  successfulLoginMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: AppService
  ) {}

  ngOnInit(): void {
    this.loginModForm = this.formBuilder.group({
      user_email: [null, [Validators.required]],
      user_password: [null, [Validators.required]],
    });
  }

  onSubmitLoginForm(): void {
    console.log(this.loginModForm.value);
  }

  restoreInput(): void {
    this.formIsIncorrect = false;
    this.errorMessage = '';
  }
}
