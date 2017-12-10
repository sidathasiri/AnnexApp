import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  constructor(private route: ActivatedRoute, private userService: UserService){}
  currentUser: any;

  ngOnInit(){
    this.currentUser = this.userService.getLoggedUser();
  }

}
