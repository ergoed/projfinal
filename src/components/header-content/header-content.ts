import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';


@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContentComponent {

  @Input() title: string;
  @Input() backEnabled: Boolean;
  showBack:Boolean;

  @Output() onBack: EventEmitter<any> = new EventEmitter();
  user;
  constructor(public authProvider: AuthProvider,
              public navCtrl: NavController,
              public navParams: NavParams,) {
    this.authProvider.user$.subscribe((user)=> {
      this.user = user;
    })
  }

  ngOnInit() {
      this.showBack = this.backEnabled;
  }

  onClickBack(){
    this.onBack.emit({})
  }

  showUserInfo(){
    this.navCtrl.push('UserinfoPage');
  }

}
