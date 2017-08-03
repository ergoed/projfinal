import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotosPage } from './photos';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';
import { DiffDatePipe } from '../../pipes/diff-date/diff-date';



@NgModule({
  declarations: [
    PhotosPage,
    DiffDatePipe
  ],
  imports: [
    IonicPageModule.forChild(PhotosPage),
    HeaderContentComponentModule
  ],
  exports: [
    PhotosPage
  ]
})
export class PhotosPageModule {}
