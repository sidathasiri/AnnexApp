import { Component } from '@angular/core';

import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'addNew',
  templateUrl: './addNew.component.html'
})
export class AddNewComponent{
  constructor(private userService: UserService){}



}
