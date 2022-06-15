import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingConnexionPageComponent } from './landing-connexion-page/landing-connexion-page.component';
import { LoginPageComponent } from './login-page-component/login-page-component.component';
import { PostsPageComponent} from './posts-page-component/posts-page-component.component';

const routes: Routes = [
  {path:'', component: LandingConnexionPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'posts', component: PostsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
