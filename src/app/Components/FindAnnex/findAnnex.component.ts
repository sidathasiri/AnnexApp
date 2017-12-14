import { Component } from '@angular/core';
import { CommonService } from '../../Services/common.service';
import { PostService } from '../../Services/PostService/post.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'find-annex',
  templateUrl: './findAnnex.component.html',
  styleUrls: ['./findAnnex.component.css']
})
export class FindAnnexComponent implements OnInit {

  posts: any;
  provinces: any[];
  currentProvince: any = {};

  province: string = 'Any';
  district: string = 'Any';
  gender: string = 'any';
  
  constructor(
    private commonService: CommonService, 
    private router:Router,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.commonService.getProvinces()
      .subscribe(res => this.provinces = res);
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

  search(){
    var formData = {
      'province': this.province,
      'district': this.district,
      '$or': [{'gender': this.gender}, {'gender': 'any'}]
    };

    if(this.province=='Any')
      delete formData.province;
    if(this.district=='Any')
      delete formData.district;
    if(this.gender=='any'){
      formData['$or'] = [{'gender': 'male'}, {'gender': 'female'}, {'gender': 'any'}];
    }
    console.log(formData);
    this.postService.fetchPosts(formData)
    .then(res => {
      this.posts = res;
      console.log(res);
    }, err => {
      console.log(err);
    });
   // this.router.navigate(['/search-results']);
  }

  viewDetails(post: any){
    post.view = 'find';
    this.router.navigate(['/postDetails', post ]);
  }

}
