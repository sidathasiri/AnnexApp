import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  addUser(user: any){
    return new Promise((resolve, reject) => {
        this.http.post('/api/addUser', user)
        .map(res => res.json())
        .subscribe(res => {
            resolve(res);
        }, err => {
            reject(err);
        });
    });
  }

}