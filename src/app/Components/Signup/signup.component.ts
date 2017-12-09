import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email: string;
  password1: string;
  password2: string;

  constructor(private userService: UserService){}

  signup(){
    console.log({'email': this.email, 'password:':this.password1});
    this.userService.addUser({'email': this.email, 'password':this.password1})
    .then((result) => {console.log(result)}, (err) => console.log(err));

  }


}
