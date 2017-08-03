import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestbookPage } from './guestbook';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';


@NgModule({
  declarations: [
    GuestbookPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestbookPage),
    HeaderContentComponentModule
  ],
  exports: [
    GuestbookPage
  ]
})
export class GuestbookPageModule {}
