import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { UserService } from '../../Services/UserService/user.service';
import { PostService } from '../../Services/PostService/post.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private postService: PostService
  ){}
  currentUser: any;
  posts: any;

  ngOnInit(){
    this.currentUser = this.userService.getLoggedUser();
    this.postService.getPosts(this.currentUser)
    .then((posts) => {
      this.posts = posts;
      console.log(this.posts);
    }, (err) => {
      console.log(err);
    })
  }

}
