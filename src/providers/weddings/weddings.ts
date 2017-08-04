import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { prodVariables } from "../../../environments/production";
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

export interface IWeddings extends Array<IWedding> {

}

export interface IWedding {
  mID: string;
  _id?: string;
  title: string;
  date: string;
  place1: string;
  place2: string;
  admin: string;
  table: Table;
}

export interface Table {
      number: number;
      people: [string]
    };

    export const POSTS_URL = (process.env.IONIC_ENV === 'prod')? prodVariables.apiEndpoint+"/api/weddings" : "http://localhost:3000/api/weddings";


@Injectable()
export class WeddingsProvider {



  constructor(public http: Http,
  private readonly storage: Storage) {

  }

  getMariage(idMariage: string): Observable<any> {
    return this.http.get(`${POSTS_URL}`+idMariage)
      .map(response => response.text())
      .map(wedding => {
        this.storage.set('wedding', wedding)
      })
      .catch(err => Observable.throw(err));
  }
}
