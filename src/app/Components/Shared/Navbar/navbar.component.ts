import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavComponent {
  activeLink: string = 'Home';

  setActive(link:string){
    this.activeLink = link;
    console.log(this.activeLink);
  }
}
