import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class PostService {

    constructor(private http: Http) { }

    addPost(post: any) {
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

    getPosts(email: string) {
        return new Promise((resolve, reject) => {
            this.http.get('/api/getPosts/' + email)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    deletePost(post: any) {
        return new Promise((resolve, reject) => {
            this.http.delete('/api/deletePost/' + post._id)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
        });
    }

    updatePost(post: any){
        return new Promise((resolve, reject) => {
            this.http.put('/api/updatePost', post)
            .map(res => res.json())
            .subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

}