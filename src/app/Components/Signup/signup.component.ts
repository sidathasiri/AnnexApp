import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Response} from '@angular/http';

import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email: string;
  password1: string = '';
  password2: string = '';
  error: string = null;
  isSuccess: boolean = false; 

  constructor(private userService: UserService){}

  signup(){
    this.error = null;
    this.isSuccess = false;
    if(this.isPasswordsSame()){
      this.userService.addUser({'email': this.email, 'password':this.password1})
      .then((result) => {
        this.isSuccess = true;
      }, (err) => {
        this.error = err;
      });
    } else {
      this.error = "Passwords do not match!";
    }

  }

  isPasswordsSame(): boolean{
    if(this.password1 != this.password2){
      return false;
    }
    return true;
  }


}
