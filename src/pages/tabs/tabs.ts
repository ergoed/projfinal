import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name:'tab',
})
@Component({
    selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'InfoPage';
  tab2Root = 'LocationsPage';
  tab3Root = 'photos';
  tab4Root = 'GuestbookPage';

  user_name:string = "John Doe";

  constructor() {

  }
}
