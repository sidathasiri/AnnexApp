import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router){}

  login(){
    this.error = '';
    this.userService.login({'email': this.email, 'password': this.password})
    .then(res => {
      this.router.navigate(['/dashboard', {'email': this.email}]);
    }, err => {
      this.error = err;
    });
  }
}