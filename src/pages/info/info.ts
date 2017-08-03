import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription.js'
import { WeddingsProvider, IWeddings, IWedding } from '../../providers/weddings/weddings';


@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

weddingActive
idwed= "59839b8733dcfe2e333a4120"

  active_wedding = "wedding2"

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public wedding: WeddingsProvider,) {

                this.weddingActive = this.wedding.getMariage(this.idwed)
                console.log(this.weddingActive.title)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
