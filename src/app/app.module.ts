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
    JsonpModule
  ],
  providers: [
    LessonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
