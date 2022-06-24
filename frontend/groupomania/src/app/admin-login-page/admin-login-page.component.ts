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
    this.loginService
      .sendAdminLoginFormToBackend(this.loginModForm.value)
      .subscribe(
        (result: any) => {
          console.log(
            '%c Résultat: ' + JSON.stringify(result),
            'background-color: green; font-size: 16px'
          );
          console.log('JWT → ' + result.token);
          let token = result.token;
          let userId = result.user_id;
          this.loginService.setCookieToken(token);
          this.loginService.getCookieToken();
          this.isUserSuccessfullyLoggedIn = true;
          this.successfulLoginMessage = result.message;
          sessionStorage.setItem('userId', userId);
          setTimeout(() => {
            this.router.navigateByUrl('/posts');
          }, 2500);
        },
        (error: any) => {
          console.log(
            'Erreur: ' + error.message + '\n STATUS: ' + error.status
          );
          console.log('\n CODE: ', error);
          this.formIsIncorrect = true;
          this.errorMessage = error.error.message;
        }
      );
  }

  restoreInput(): void {
    this.formIsIncorrect = false;
    this.errorMessage = '';
  }
}
