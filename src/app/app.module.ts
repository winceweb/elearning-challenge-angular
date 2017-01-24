import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PresentationComponent } from './presentation/presentation.component';
import { ContactComponent } from './contact/contact.component';
import { LessonComponent } from './lesson/lesson.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';


// Services
import { LessonService } from '../services/lesson.service';
import { ProblematicService } from '../services/problematic.service';
import { UserService } from '../services/user.service';
import { AuthService } from './auth.service';
// Manager
import { AuthManager } from './authmanager';

import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';
import { ProblematicComponent } from './problematic/problematic.component';
import { DestroyComponent } from './destroy/destroy.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddclientComponent } from './addclient/addclient.component';

import { LocalStorageModule } from 'angular-2-local-storage';

const appRoutes: Routes = [
  {path: '', component:DashboardComponent, canActivate: [AuthManager]},
  {path: 'login', component:LoginComponent, canActivate: [AuthManager]},
  {path: 'addclient', component:AddclientComponent, canActivate: [AuthManager]},
  {path: 'presentation', component:PresentationComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'lessons', component:LessonComponent, canActivate: [AuthManager]},
  {path: 'lesson/:id', component:LessonDetailsComponent, canActivate: [AuthManager]},
  {path: 'problematic/:id', component:ProblematicComponent, canActivate: [AuthManager]},
  {path: 'destroy', component:DestroyComponent, canActivate: [AuthManager]},
  {path: 'users', component:UserComponent, canActivate: [AuthManager], data: {roles: 'teacher'} },
  {path: 'user/:id', component:UserDetailsComponent, canActivate: [AuthManager]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
    PageNotFoundComponent,
    PresentationComponent,
    ContactComponent,
    LessonComponent,
    LessonDetailsComponent,
    ProblematicComponent,
    DestroyComponent,
    LoginComponent,
    DashboardComponent,
    AddclientComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [
    LessonService,
    ProblematicService,
    AuthService,
    AuthManager,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
