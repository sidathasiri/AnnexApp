import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

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
    private postService: PostService,
    private router: Router
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
    });
  }

  viewDetails(post: any){
    this.router.navigate(['/postDetails', post]);
  }

  deletePost(post: any){
    console.log(post);
    this.postService.deletePost(post)
    .then(res => {
      this.postService.getPosts(this.currentUser)
      .then((posts) => {
        this.posts = posts;
        console.log(this.posts);
      }, (err) => {
        console.log(err);
      });
    }, err => {
      console.log("delete error");
    })
  }

  editPost(){
      
  }


}
