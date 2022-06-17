import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { interval, Observable } from 'rxjs';

import { LoginPageServiceService } from '../login-page-component/login-page-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, private loginService: LoginPageServiceService) { }

  interval$!: Observable<number>;

  ngOnInit(): void {
    this.interval$ = interval(1000);
    // this.interval$.subscribe(
    //   (value)=>{  
    //     console.log(value + "%c URL: " + this.router.url, "background-color: crimson; font-size: 16px;");
    //   }
    // );
  }

  logout(){
    this.loginService.deleteCookieToken();
    this.router.navigateByUrl('/')
  }


}
