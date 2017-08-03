import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpostPage } from './addpost';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    AddpostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddpostPage),
    HeaderContentComponentModule
  ],
  exports: [
    AddpostPage
  ],
  providers: [
    Camera
  ]
})
export class AddpostPageModule {}
