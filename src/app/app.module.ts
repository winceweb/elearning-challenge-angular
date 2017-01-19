import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ContactComponent } from './contact/contact.component';
import { LessonComponent } from './lesson/lesson.component';

import { LessonService } from '../services/lesson.service';
import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddclientComponent } from './addclient/addclient.component';
import { AuthManager } from './authmanager';
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'addclient', component:AddclientComponent},
  {path: 'presentation', component:PresentationComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'lessons', component:LessonComponent},
  {path: 'lesson/:id', component:LessonDetailsComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PageNotFoundComponent,
    PresentationComponent,
    ContactComponent,
    LessonComponent,
    LessonDetailsComponent,
    LoginComponent,
    DashboardComponent,
    AddclientComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    LessonService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
