import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { prodVariables } from "../../../environments/production";

import 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface IGuestmessages extends Array<IGuestmessage> {

}

export interface IGuestmessage {
  creator: Creator;
  _id?: string;
  title: string;
  body: string;
}

export interface Creator {
      name: string;
      uID: string;
      avatarSRC?: string;
    };

export const POSTS_URL = (process.env.IONIC_ENV === 'prod')? prodVariables.apiEndpoint+"/api/guestmessages" : "http://localhost:3000/api/guestmessages";


@Injectable()
export class GuestmessagesProvider {

  public guestmessages: Observable<IGuestmessage[]>;
  private _guestmessages: BehaviorSubject<IGuestmessage[]>;
  private _dataStore: {  // This is where we will store our data in memory
    guestmessages: IGuestmessage[]
  };

  constructor(public http: Http) {
    this._dataStore = { guestmessages: [] };
    this._guestmessages = <BehaviorSubject<IGuestmessage[]>>new BehaviorSubject([]);
    this.guestmessages = this._guestmessages.asObservable();
  }

  // Get all guestmessages
  loadAll():void {
    this.http.get(`${POSTS_URL}`)
             .map(response => response.json())
             .subscribe(
                data => {
                  // add new datas to store.guestmessages
                  this._dataStore.guestmessages = data.sort(item=>{return item});
                  //this._dataStore.guestmessages = data;
                  // assign new state to observable Todos Subject
                  this._guestmessages.next(Object.assign({}, this._dataStore).guestmessages);
                },
                error => this.handleError(`${(error.statusText)? error.statusText + ' Could not load guestmessages.' : 'Could not load guestmessages.'}`) //console.log('Could not load guestmessages.')
             );
  }


  // Get all guestmessages by ID
  load(id: number | string):void {
    this.http.get(`${POSTS_URL}/${id}`)
             .map(response => response.json())
             .subscribe(
                 data => {
                    let notFound = true;
                    this._dataStore.guestmessages.forEach((item, index) => {
                      if (item._id === data.id) {
                        this._dataStore.guestmessages[index] = data;
                        notFound = false;
                      }
                    });
                    if (notFound) {
                      this._dataStore.guestmessages.push(data);
                    }
                    this._guestmessages.next(Object.assign({}, this._dataStore).guestmessages);
                 },
                 error => this.handleError(`${(error.statusText)? error.statusText + ' Could not load message.' : 'Could not load message.'}`) //console.log('Could not load post.')
             );
  }

// UPDATE guestmessages

  update(guestmessage: IGuestmessage):Promise<IGuestmessage|string> {
      // let url:string = `${POSTS_URL}/${post._id}`; //see mdn.io/templateliterals
      let body:string = JSON.stringify(guestmessage)
      let headers:Headers = new Headers({'Content-Type': 'application/json'});

      // Return the result in a promise to use into the caller components
      return new Promise((resolve, reject)=>{
        this.http.patch( body, {headers: headers})
                 .map(response => response.json())
                 .subscribe(
                     data => {
                        //console.log('data->',  data)
                        // search the todo in the dataStore
                        this._dataStore.guestmessages.forEach((t, i) => {
                          // if todo is into the store we update the todo data.
                          if (t._id === data.response._id) {
                            //console.log('if update t._id === data.response._id ->', t._id, data)
                            // todo is find -> we update the todo into the store
                            this._dataStore.guestmessages[i] = <IGuestmessage>data.response;
                          }
                        });
                        // send new stat to the _todo Subject
                        this._guestmessages.next(Object.assign({}, this._dataStore).guestmessages);
                        // resolve the promise
                        resolve(data.response)
                     },
                     (error:any) => {
                       // format data error
                       let msg:string = `${(error.statusText)? error.statusText + ' Could not update todo' : 'Could not update todo'}`
                       this.handleError(msg)//console.log('Could not update todo.')
                       // reject the promise
                       reject(msg)
                     }
                 ); // Eof subscribe
      }); // Eof Promise

    }


    create(guestmessage: IGuestmessage):void {
    let body:string = JSON.stringify(guestmessage);
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`${POSTS_URL}`, body, {headers: headers})
             .map(response => response.json()) // return response as json
             .subscribe(
                data => {
                  this._dataStore.guestmessages.push(data);
                  this._guestmessages.next(Object.assign({}, this._dataStore).guestmessages);
                },
                error => this.handleError(`${(error.statusText)? error.statusText + ' Could not create post.' : 'Could not create post.'}`)
             );
  }

  // Handle Error
  handleError(error:string):void {
      console.error(error || 'Server error');
      alert(error || 'Server error');
  }
}
