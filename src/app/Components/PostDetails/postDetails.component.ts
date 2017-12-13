import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { PostService } from '../../Services/PostService/post.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'addNew',
  templateUrl: './postDetails.component.html'
})
export class PostDetailsComponent implements OnInit{

    post: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params)=>{
        this.post = params;
        console.log(params);
    });
  }
  

}
