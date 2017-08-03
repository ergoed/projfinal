import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';


export interface IPosts extends Array<IPost> {

}

export interface IPost {
  creator: Creator;
  _id?: string;
  title: string;
  body: string;
  imageSRC: string;
  postdate: string;
  weddingID: string;

}

export interface Creator {
      name: string;
      uID: string;
      avatarSRC?: string;
    };

export const POSTS_URL = 'http://localhost:3000/api/posts'

@Injectable()
export class PostsService {

  public posts: Observable<IPost[]>;
  private _posts: BehaviorSubject<IPost[]>;
  private _dataStore: {  // This is where we will store our data in memory
    posts: IPost[]
  };

  constructor(public http: Http) {
    this._dataStore = { posts: [] };
    this._posts = <BehaviorSubject<IPost[]>>new BehaviorSubject([]);
    this.posts = this._posts.asObservable();
  }

  // Get all posts
  loadAll():void {
    this.http.get(`${POSTS_URL}`)
             .map(response => response.json())
             .subscribe(
                data => {
                  // add new datas to store.posts
                  this._dataStore.posts = data.sort(item=>{return item});
                  //this._dataStore.posts = data;
                  // assign new state to observable Todos Subject
                  this._posts.next(Object.assign({}, this._dataStore).posts);
                },
                error => this.handleError(`${(error.statusText)? error.statusText + ' Could not load posts.' : 'Could not load posts.'}`) //console.log('Could not load posts.')
             );
  }

  // getData(): any[] {
  //    // return mock data synchronously
  //    let data: any[] = [];
  //    for (var i = 0; i < 3; i++) {
  //      data.push( this.loadAll() );
  //    }
  //    return data;
  //  }
  //
  //  getAsyncData(): Promise<any[]> {
  //    // async receive mock data
  //    return new Promise(resolve => {
  //
  //      setTimeout(() => {
  //        resolve(this.getData());
  //      }, 1000);
  //
  //    });
  //  }



  // Get all post by ID
  load(id: number | string):void {
    this.http.get(`${POSTS_URL}/${id}`)
             .map(response => response.json())
             .subscribe(
                 data => {
                    let notFound = true;
                    this._dataStore.posts.forEach((item, index) => {
                      if (item._id === data.id) {
                        this._dataStore.posts[index] = data;
                        notFound = false;
                      }
                    });
                    if (notFound) {
                      this._dataStore.posts.push(data);
                    }
                    this._posts.next(Object.assign({}, this._dataStore).posts);
                 },
                 error => this.handleError(`${(error.statusText)? error.statusText + ' Could not load post.' : 'Could not load post.'}`) //console.log('Could not load post.')
             );
  }

// UPDATE Post

  update(post: IPost):Promise<IPost|string> {
      // let url:string = `${POSTS_URL}/${post._id}`; //see mdn.io/templateliterals
      let body:string = JSON.stringify(post)
      let headers:Headers = new Headers({'Content-Type': 'application/json'});

      // Return the result in a promise to use into the caller components
      return new Promise((resolve, reject)=>{
        this.http.patch( body, {headers: headers})
                 .map(response => response.json())
                 .subscribe(
                     data => {
                        //console.log('data->',  data)
                        // search the todo in the dataStore
                        this._dataStore.posts.forEach((t, i) => {
                          // if todo is into the store we update the todo data.
                          if (t._id === data.response._id) {
                            //console.log('if update t._id === data.response._id ->', t._id, data)
                            // todo is find -> we update the todo into the store
                            this._dataStore.posts[i] = <IPost>data.response;
                          }
                        });
                        // send new stat to the _todo Subject
                        this._posts.next(Object.assign({}, this._dataStore).posts);
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


    create(post: IPost):void {
    let body:string = JSON.stringify(post);
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`${POSTS_URL}`, body, {headers: headers})
             .map(response => response.json()) // return response as json
             .subscribe(
                data => {
                  this._dataStore.posts.push(data);
                  this._posts.next(Object.assign({}, this._dataStore).posts);
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
