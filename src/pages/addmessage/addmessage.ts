import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuestmessagesProvider} from '../../providers/guestmessages/guestmessages';
import { UsersProvider } from '../../providers/users/users';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-addmessage',
  templateUrl: 'addmessage.html',
})
export class AddmessagePage {

  user
  title: any;
  body: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private guestmessagesProvider: GuestmessagesProvider,
              public usersProvider: UsersProvider,
              public authProvider: AuthProvider,) {

              this.authProvider.user$.subscribe((user)=> {
                this.user = user;
              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmessagePage');
  }

  submit(){
  console.log("sdfghj");
    this.guestmessagesProvider.create({
      creator: {
        name: this.user.name,
        uID: this.user._id,
        avatarSRC: this.user.avatarSRC
      },
      title: this.title,
      body: this.body,
    })
   this.navCtrl.pop();
  }
// close(): void {
// this.viewCtrl.dismiss();
// }
}
