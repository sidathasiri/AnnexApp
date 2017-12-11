import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  addPost(post: any){
    return new Promise((resolve, reject) => {
        this.http.post('/api/addPost', post)
        .map(res => res.json())
        .subscribe(res => {
            resolve(res);
        }, err => {
            reject(err);
        });
    });
  }

}