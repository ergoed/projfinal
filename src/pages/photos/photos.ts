import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription.js'

import { PostsService, IPosts, IPost } from '../../providers/posts/posts';
import { UsersProvider } from '../../providers/users/users';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';



@IonicPage({
  name:'photos',
})
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {

  public posts:Observable<IPosts>;

  photos: string = "stream";
  limit: number = 5;
  user;
  public favored = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public postService: PostsService,
              public usersProvider: UsersProvider,
              public authProvider: AuthProvider,) {
        this.posts = this.postService.posts;
        this.postService.loadAll()
        this.authProvider.user$.subscribe((user)=> {
          this.user = user;
        })
  }




  ionViewDidLoad():void {
    console.log('ionViewDidLoad PhotosPage');
  }

  onClick(){
    this.limit = this.limit+10
  }

  favorite(item: IPost){
        console.log()
        this.usersProvider.addFavoritePost(this.user._id, item._id)
            .subscribe(
              data => {
                console.log('favorite data-> ', data,this.user._id, item._id)
                ///proces response -> show message, toast, modal, etc...
                //test data.success, use data.message to display result to user
              },
              err => {
                console.warn('favore err', err)
              }
            )
            console.log('favorite data-> ', this.user._id, item._id)
  }

  removeFavorite(item: IPost){
      console.log()
      this.usersProvider.deleteFavoritePost(this.user._id, item._id)
          .subscribe(
            data => {
              console.log('favorite data-> ', data,this.user._id, item._id)
              ///proces response -> show message, toast, modal, etc...
              //test data.success, use data.message to display result to user
            },
            err => {
              console.warn('favore err', err)
            }
          )
          console.log('favorite data-> ', this.user._id, item._id)
  }

  favoritToogle(){
        this.favored = !this.favored;
    }

  postPhoto(){
    console.log("post photo check");
    this.navCtrl.push('AddpostPage');
  }

}
