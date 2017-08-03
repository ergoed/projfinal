import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';



/**
 * Generated class for the UserinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {
  user;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,) {
          this.authProvider.user$.subscribe((user)=> {
            this.user = user;
          })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserinfoPage');
  }

  logOut(){
    this.authProvider.logout()
    this.navCtrl.setRoot('login');
  }

}
