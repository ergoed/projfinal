import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderContentComponent } from './header-content';
import { Component } from '@angular/core';

@NgModule({
  declarations: [
    HeaderContentComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    HeaderContentComponent
  ]
})
export class HeaderContentComponentModule {}
