import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LandingConnexionPageComponent } from './landing-connexion-page/landing-connexion-page.component';
import { LoginPageComponent } from './login-page-component/login-page-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsPageComponent} from './posts-page-component/posts-page-component.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'posts', component: PostsPageComponent},
  {path:'', component: LandingConnexionPageComponent},
  {path: '**', component: PageNotFoundComponent}
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
