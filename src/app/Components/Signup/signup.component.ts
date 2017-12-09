import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email: string;
  password1: string;
  password2: string;

  signup(form:any){
    console.log(form);
    console.log(this.email+"  "+ this.password1+"  "+this.password2);
  }
}
