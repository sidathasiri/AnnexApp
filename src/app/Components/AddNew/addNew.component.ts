import { Component, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

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
  ){
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  post: any;
  provinces: any[];
  currentProvince: any = {};

  name: string;
  province: string = 'Any';
  district: string;
  gender: string = 'male';
  price: string;
  description: string;

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

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }
 
  startUpload(): void {
    this.post = {
      'name': this.name,
      'province': this.province,
      'disctrict': this.district,
      'gender': this.gender,
      'price': this.price,
      'description': this.description,
      'user': this.userService.getLoggedUser()
    };

    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:3000/uploadPost',
      method: 'POST',
      data: this.post
    };
 
    this.uploadInput.emit(event);
    console.log(this.files[0]);
  }
 
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
 
  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
 
  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }



}
