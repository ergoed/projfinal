/**
 * @Author: alexandrerocca
 * @Date:   2017-07-21T14:23:45+02:00
 * @Last modified by:   alexandrerocca
 * @Last modified time: 2017-07-28T11:20:07+02:00
 */

import { Injectable } from '@angular/core';
import { prodVariables } from "../../../environments/production";
/*
  Generated class for the EndpointsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EndpointsProvider {

  API_PATH: string = (process.env.IONIC_ENV === 'prod')? prodVariables.apiEndpoint : "http://localhost:3000";


  getPlaces(){
    //return 'assets/data/courses.json';
    return this.API_PATH + "/api/places"
  }

  getSignup(){
    return this.API_PATH + "/api/users";
  }

  getUser(){
    return this.API_PATH + '/api/users/:id';
  }

  getCheckLogin(){
    return this.API_PATH + "/api/users/isauth";
  }

  getLogin(){
    console.log("dans getlogin of endpoints")
    return this.API_PATH + "/api/users/login";
  }

  setPassword(userId){
    return this.API_PATH + "/api/users/" + userId + "/actions/set-password";
  }


}
