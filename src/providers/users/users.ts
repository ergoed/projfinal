
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { EndpointsProvider } from '../endpoints/endpoints';
import { AuthProvider } from '../../providers/auth/auth';


@Injectable()
export class UsersProvider {

  user;
  data: any;
  eventUrl = 'http://localhost:3000/api/users/';

  constructor(public http: Http,
              private readonly endpoints: EndpointsProvider,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelper,
              private authProvider: AuthProvider,
              public authHttp: AuthHttp) {

    console.log('Hello AuthProvider Provider');
  }
  //   this.data = null;
  //   console.log('Hello EventsProvider Provider');
  // load() {
  //   return this._http.get(this._eventUrl);
  // }
  //
  // load() {
  //     if (this.data) {
  //       return Promise.resolve(this.data);
  //     }
  //
  //     return new Promise(resolve => {
  //
  //       this._http.get(this._eventUrl)
  //         .map(res => res.json())
  //         .subscribe(data => {
  //           this.data = data;
  //           resolve(this.data);
  //         });
  //     });
  //   }

  addFavoritePost(uid, pid) {

    console.log(uid, pid)
    return this.http.post(this.eventUrl + `${uid}/actions/addtofavorite/`, {uid: uid, pid: pid})
              .map(res => res.json())

  }

  deleteFavoritePost(uid, pid) {

    console.log(uid, pid)
    return this.http.post(this.eventUrl + `${uid}/actions/deletefavorite/`, {uid: uid, pid: pid})
              .map(res => res.json())

  }


}
