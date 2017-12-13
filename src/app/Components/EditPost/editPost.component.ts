import { Component } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";

import { PostService } from '../../Services/PostService/post.service';
import { CommonService } from '../../Services/common.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'editPost',
  templateUrl: './editPost.component.html'
})
export class EditPostComponent implements OnInit{

    post: any;
    provinces: any[];
    currentProvince: any = {};
        
  constructor(
    private postService: PostService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.activatedRoute.params.subscribe((params)=>{
        this.post = params;
        console.log("posttttt");
        console.log(this.post.province);
        
    });
  }

  ngOnInit(){
    this.commonService.getProvinces()
    .subscribe(provinces => {
      this.provinces = provinces;
      this.setProvince(this.post.province);
    }, err => {
      console.log(err);
    });

    
  }

  setProvince(province: string) {
    if (province == 'Any') {
      this.currentProvince = {};
    } else {
      for (var i = 0; i < this.provinces.length; i++) {
        if (this.provinces[i].name == province) {
          this.currentProvince = this.provinces[i];
        }
      }
    }
  }

  updatePost(){

  }

  goBack(){
      this.router.navigate(['/dashboard']);
  }

}
