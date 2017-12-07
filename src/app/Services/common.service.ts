import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  getProvinces(){
    return this.http.get('/api/province')
    .map(res => res.json());
  }

}