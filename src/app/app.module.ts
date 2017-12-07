import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/HomeComponent/home.component';
import { NavComponent } from './Components/Shared/Navbar/navbar.component';
import { FindAnnexComponent } from './Components/FindAnnex/findAnnex.component';
import { LoginComponent } from './Components/Login/login.component';
import { SignupComponent } from './Components/Signup/signup.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';

import { CommonService } from './Services/common.service'

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'find', component: FindAnnexComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FindAnnexComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
