import { Component } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import {NgForm} from '@angular/forms';

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

    //form inputs
    name: string;
    province: string = 'Any';
    district: string;
    gender: string = 'male';
    price: string;
    description: string;
        
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
        this.name = this.post.name;
        this.province = this.post.province;
        this.district = this.post.district;
        this.gender = this.post.gender;
        this.price = this.post.price;
        this.description = this.post.description;
        
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
    console.log("post data");
    var updatedPost = {
        'description': this.description,
        'district': this.district,
        'gender': this.gender,
        'images': this.post.images,
        'name': this.name,
        'price': this.price,
        'province': this.province,
        'user': this.post.user,
        '_id': this.post._id 
    }
    this.postService.updatePost(updatedPost)
    .then(res => {
        console.log(res);
        this.router.navigate(['/dashboard']);
    }, err => {
        console.log(err);
    });
  }

  goBack(){
      this.router.navigate(['/dashboard']);
  }

}
