import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ContactComponent } from './contact/contact.component';
import { LessonComponent } from './lesson/lesson.component';

import { LessonService } from '../services/lesson.service';
import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';

const appRoutes: Routes = [
  {
    path: 'connexion',
    component: UsersComponent,
    data: { title: 'Authentification' }
  },
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Page d\'accueil' }
  },
  {
    path: 'presentation',
    component: PresentationComponent,
    data: { title: 'Page de présentation' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Formulaire de contact' }
  },
  {
    path: 'lessons',
    component: LessonComponent,
    data: { title: 'Liste des leçons' }
  },
  {
    path: 'lesson/:id',
    component: LessonDetailsComponent,
    data: { title: 'Détails d\'une lessons' }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PageNotFoundComponent,
    HomeComponent,
    PresentationComponent,
    ContactComponent,
    LessonComponent,
    LessonDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    A2tUiModule
  ],
  providers: [
    LessonService,
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase:                    'http://localhost:8000/api/v1/',
      apiPath:                    '',

      signInPath:                 'auth/sign_in',
      signInRedirect:             null,
      signInStoredUrlStorageKey:  null,

      signOutPath:                'auth/sign_out',
      validateTokenPath:          'auth/validate_token',
      signOutFailedValidate:      false,

      registerAccountPath:        'auth',
      deleteAccountPath:          'auth',
      registerAccountCallback:    window.location.href,

      updatePasswordPath:         'auth',
      resetPasswordPath:          'auth/password',
      resetPasswordCallback:      window.location.href,

      oAuthPaths: {
        github:                 'auth/github'
      },
      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      userTypes:                  null,

      globalOptions: {
        headers: {
          'Content-Type':     'application/json',
          'Accept':           'application/json'
        }
      }
    });

    this._tokenService.signIn({
      email:    'example@example.org',
      password: 'secretPassword'
    }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );

    this._tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );

    this._tokenService.registerAccount({
      email:                'example@example.org',
      password:             'secretPassword',
      passwordConfirmation: 'secretPassword'
    }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );

    this._tokenService.deleteAccount().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );


  }

}
