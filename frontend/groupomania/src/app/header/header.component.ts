import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) { }

  interval$!: Observable<number>;

  ngOnInit(): void {
    this.interval$ = interval(1000);
    this.interval$.subscribe(
      (value)=>{  
        console.log(value + "%c URL: " + this.router.url, "background-color: crimson; font-size: 16px;");
      }
    );
  }

  logout(){
    //Ajouter code pour supprimer les cookies ici
    this.router.navigateByUrl('/')
  }


}
