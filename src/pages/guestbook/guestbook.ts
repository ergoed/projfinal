import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription.js'

import { PostsService, IPosts, IPost } from '../../providers/posts/posts';
import { UsersProvider } from '../../providers/users/users';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { GuestmessagesProvider, IGuestmessages, IGuestmessage } from '../../providers/guestmessages/guestmessages';

@IonicPage()
@Component({
  selector: 'page-guestbook',
  templateUrl: 'guestbook.html',
})
export class GuestbookPage {

  public guestmessages:Observable<IGuestmessages>;

  limit: number = 5;
  user;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public guestmessagesProvider: GuestmessagesProvider,
              public usersProvider: UsersProvider,
              public authProvider: AuthProvider,) {
        this.guestmessages = this.guestmessagesProvider.guestmessages;
        this.guestmessagesProvider.loadAll()
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


  postMessage(){
    console.log("post photo check");
    this.navCtrl.push('AddmessagePage');
  }

}
