import { Component } from '@angular/core';

import { UserService } from '../../Services/UserService/user.service';
import { PostService } from '../../Services/PostService/post.service';
import { CommonService } from '../../Services/common.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'addNew',
  templateUrl: './addNew.component.html'
})
export class AddNewComponent implements OnInit{
  constructor(private commonService: CommonService, private postService: PostService){}

  post: any;
  provinces: any[];
  currentProvince: any = {};

  ngOnInit(){
    this.commonService.getProvinces()
    .subscribe(provinces => {
      this.provinces = provinces;
    }, err => {
      console.log(err);
    })
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

  addPost(){
    console.log("post details");
    console.log(this.post);
  }



}
