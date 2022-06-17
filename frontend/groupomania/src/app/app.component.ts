import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'groupomania';
  private cookieTest!: CookieService;


constructor(private cookieService: CookieService){}



ngOnInit():void {
  this.cookieService.set('cookie-name', 'value');
  this.cookieService.get("cookie-name")

}

}
