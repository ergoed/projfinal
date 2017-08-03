
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Observable, BehaviorSubject } from "rxjs";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';
import { EndpointsProvider } from '../endpoints/endpoints';

@Injectable()
export class AuthProvider {

  private authUser = new BehaviorSubject(null);
  public user$: Observable<User> = this.authUser.asObservable();

  error: string = '';

  constructor(public http: Http,
              private readonly endpoints: EndpointsProvider,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelper,
              public authHttp: AuthHttp) {

    console.log('Hello AuthProvider Provider');
  }

  checkLogin() {
  this.storage.get('jwt').then(jwt => {
    console.log('checkLogin', jwt)
    if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
      console.log('Not Expired', this.endpoints.getCheckLogin());
      this.authHttp.get(this.endpoints.getCheckLogin())
                   .map(res => res.json())
                   .map(jwt => this.handleJwtResponse(jwt))
                   .take(1)
                   .subscribe(
                     () => { console.log('checkLogin 2'); }
                   )
    }
    else {
      console.log('Expired');
      this.storage.remove('jwt').then(() => this.authUser.next(null));
    }
  });
}

  login(values: any): Observable<any> {
    console.log("in login of this.auth");
    return this.http.post(this.endpoints.getLogin(), values)
    .map(response => response.json())
    .map(jwt => this.handleJwtResponse(jwt))
    .catch(err => Observable.throw(this.handleErrors(err)));
  }

  logout() {
    this.storage.remove('jwt').then(() => this.authUser.next(null));
  }

  private handleErrors(err: any): any {
      if (!err.ok && err.statusText == '') {
        err.statusText = 'Erreur de connexion avec le serveur';
      }
      return err;
    }

  signup(user: any): Observable<any> {
    console.log('toto');
    console.log(user)
    return this.http.post(this.endpoints.getSignup(), user)
    .map(response => {
      console.log("response " + response)
      return response.json();
    })
    .map(jwt => { this.handleJwtResponse(jwt) })
    .catch(err => Observable.throw(this.handleErrors(err)));
  }


  private handleJwtResponse(jwt: any): Promise<string> {
    console.log('handleJwtResponse', jwt, typeof jwt);
    if (!jwt.success) {
      throw Observable.throw(jwt.message);
    }

    return this.storage.set('jwt', jwt.token)
      .then(() => this.authUser.next(this.jwtHelper.decodeToken(jwt.token)))
      .then(() => jwt.token);
}


}
