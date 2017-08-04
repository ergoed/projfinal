import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddmessagePage } from './addmessage';

@NgModule({
  declarations: [
    AddmessagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddmessagePage),
  ],
  exports: [
    AddmessagePage
  ]
})
export class AddmessagePageModule {}
