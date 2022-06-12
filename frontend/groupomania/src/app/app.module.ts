import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingConnexionPageComponent } from './landing-connexion-page/landing-connexion-page.component';
import {LandingConnexionPageService} from './landing-connexion-page/landing-connexion-page.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingConnexionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LandingConnexionPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
