import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserinfoPage } from './userinfo';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';

@NgModule({
  declarations: [
    UserinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserinfoPage),
    HeaderContentComponentModule
  ],
  exports: [
    UserinfoPage
  ]
})
export class UserinfoPageModule {}
