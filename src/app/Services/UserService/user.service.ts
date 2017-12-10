import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs';
import { Subject } from 'rxjs/Subject';

import { NavComponent } from '../../Components/Shared/Navbar/navbar.component';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  isLoggedIn: boolean;
  currentUser: string = '';

  private subject = new Subject<any>();
  
  addUser(user: any){
    return new Promise((resolve, reject) => {
        this.http.post('/api/addUser', user)
        .map(res => res.json())
        .subscribe(res => {
            if(res.error){
                reject(res.error);
            }
            else{
                resolve(res);
                this.isLoggedIn = true;
                this.subject.next({loggedStatus: true});
                this.currentUser = res.email;
            }
        }, err => {
            reject(err);
        });
    });
  }

  login(user: any){
    return new Promise((resolve, reject)=>{
        this.http.post('/api/login', user)
        .map(res => res.json())
        .subscribe(res => {
            if(res.error){
                reject(res.error);
            } else{
                resolve(res);
                this.isLoggedIn = true;
                this.subject.next({loggedStatus: true});
                this.currentUser = res.email;
            }
        }, err => {
            reject(err);
        });
    });
  }
  
  getLoggedUser(){
      return this.currentUser;
  }

  logout(){
      this.isLoggedIn = false;
      this.subject.next({loggedStatus: false});
      this.currentUser = '';
  }

  isUserLoggedIn(){
    return this.isLoggedIn;
  }

  getLoginSubject(): Observable<any>{
      return this.subject.asObservable();
  }
  

}