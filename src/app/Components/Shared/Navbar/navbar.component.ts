import { Component } from '@angular/core';
import { UserService } from '../../../Services/UserService/user.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavComponent implements OnInit{
  activeLink: string = 'Home';
  isUserLoggedIn: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.isUserLoggedIn = this.userService.isUserLoggedIn();
    this.userService.getLoginSubject().subscribe((data)=>{
      this.isUserLoggedIn = data.loggedStatus;
    });
  }

  logout(){
    this.userService.logout();
  }

  setActive(link:string){
    this.activeLink = link;
    console.log(this.activeLink);
  }

  setIsUserLoggedIn(status: boolean){
    this.isUserLoggedIn = status;
  }
}
