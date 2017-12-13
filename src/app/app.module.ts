import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/HomeComponent/home.component';
import { NavComponent } from './Components/Shared/Navbar/navbar.component';
import { FindAnnexComponent } from './Components/FindAnnex/findAnnex.component';
import { LoginComponent } from './Components/Login/login.component';
import { SignupComponent } from './Components/Signup/signup.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { AddNewComponent } from './Components/AddNew/addNew.component';
import { PostDetailsComponent } from './Components/PostDetails/postDetails.component';

import { CommonService } from './Services/common.service';
import { UserService } from './Services/UserService/user.service';
import { PostService } from './Services/PostService/post.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'find', component: FindAnnexComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'postDetails', component: PostDetailsComponent},
  {path: 'addNew', component: AddNewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FindAnnexComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddNewComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgUploaderModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [CommonService, UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
