import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';

import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the AroundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  destination:any;
  start:string;
  lat: number;
  lon: number;

  @ViewChild('map1')
  private map: MapComponent;

  private  location1:any;
  private location2:any;

  tab: string = "aa";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private geolocation: Geolocation){

    this.start = "";
    this.destination = [46.2043907, 6.143157699999961];
    this.location1 = {  lat: 46.2043907,
                        long: 6.143157699999961 }
    this.location2 = {  lat:46.192233,
                        long: 6.158857  }
  }

  segmentChanged(event){
    console.log('xxx', event)
    let pos;
    if(event.value ==='aa'){
      pos = this.location1
    }
    if(event.value === 'bb'){
      pos = this.location2
    }

    console.log('selected position-> ',pos, this.map)
    this.map.init(pos.lat, pos.long);
    this.map.addMarker(pos.lat, pos.long, "marquer");
  }


  navigate(){
  this.platform.ready().then(() => {
    this.geolocation.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;
      let myposition = `${this.lat},${this.lon}`;
      console.log();
      this.start = myposition;
      return this.start;
    })

    let options: LaunchNavigatorOptions = {
      start: this.start,
      app: LaunchNavigator.APP.GOOGLE_MAPS
    };
    LaunchNavigator.navigate(this.destination, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
  })
  }


  ionViewDidEnter() {
    // this.map.init(46.2043907, 6.143157699999961);
    const pos = this.location1
    console.log(this.map)
    this.map.init(pos.lat, pos.long);
    this.map.addMarker(pos.lat, pos.long, "marquer_1");
  }

}
