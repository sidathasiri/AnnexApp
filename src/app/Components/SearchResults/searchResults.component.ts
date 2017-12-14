import { Component } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";

import { PostService } from '../../Services/PostService/post.service';

@Component({
  selector: 'search-result',
  templateUrl: './searchResults.component.html'
})
export class SearchResultsComponent{

    post: any[];

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}


  goBack(){
      this.router.navigate(['/dashboard']);
  }
  

}
