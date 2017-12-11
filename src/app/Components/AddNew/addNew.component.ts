import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../Services/UserService/user.service';
import { PostService } from '../../Services/PostService/post.service';
import { CommonService } from '../../Services/common.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'addNew',
  templateUrl: './addNew.component.html'
})
export class AddNewComponent implements OnInit{
  constructor(
    private commonService: CommonService, 
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ){}

  post: any;
  provinces: any[];
  currentProvince: any = {};

  name: string;
  province: string = 'Any';
  district: string;
  gender: string = 'male';
  price: string;
  description: string;
  img1: string;
  img2: string;
  img3: string;

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

    this.post = {
      'name': this.name,
      'province': this.province,
      'disctrict': this.district,
      'gender': this.gender,
      'price': this.price,
      'description': this.description,
      'img1': this.img1,
      'img2': this.img2,
      'img3': this.img3,
      'user': this.userService.getLoggedUser()
    };
    console.log(this.post);
    this.postService.addPost(this.post)
    .then((res) => {
      console.log(res);
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log(err);
    });
  }

  //file upload process

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:3000/upload'
  };
  sizeLimit = 2000000;
 
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      alert('uploadted');
      console.log(this.uploadFile);
    }
  }
 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }



}
