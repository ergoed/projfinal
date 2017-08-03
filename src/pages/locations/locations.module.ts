import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationsPage } from './locations';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';
import { MapComponentModule } from '../../components/map/map.module';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    LocationsPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationsPage),
    HeaderContentComponentModule,
    MapComponentModule
  ],
  exports: [
    LocationsPage
  ],
  providers: [
  Geolocation
  ]
})
export class LocationsPageModule {}
