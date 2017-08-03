import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ToastController, Platform, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { PostsService} from '../../providers/posts/posts';
import { UsersProvider } from '../../providers/users/users';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';

declare var window: any;

 @IonicPage()
 @Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html',
 })
 export class AddpostPage {
    user
    code:string;
    public base64Image: string;
    private error: string;
    private imageInfo: string = 'none';
    body:any;
    postdate:any;
    timenow:any;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                private readonly platform: Platform,
                private readonly camera: Camera,
                private postservice: PostsService,
                public toastCtrl: ToastController,
                public actionSheetCtrl: ActionSheetController,
                public authProvider: AuthProvider,) {
                  this.authProvider.user$.subscribe((user)=> {
                    this.user = user;
                  })
    }


    public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.getPictureFromFolder();
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.getPicture();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }

  close(){
     this.navCtrl.pop();
  }

  async getPicture() {
    await this.platform.ready();
    try {
      await this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 200,
        targetHeight: 200
      }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (error) => this.error = error);
    }
    catch(e) {
      this.error = e;
    }

  }

  getPictureFromFolder(){
    console.log("getPictureFromFolder clicked")
    window.imagePicker.getPictures(
    	function(results) {
    		for (var i = 0; i < results.length; i++) {
    			console.log('Image URI: ' + results[i]);
    		}
    	}, function (error) {
    		console.log('Error: ' + error);
    	}, {
    		maximumImagesCount: 1,
    		width: 800
    	},   async function(imageData){
        this.base64Image = "data:image/jpeg;base64," + imageData;  //AWFMLOAEGMOAWEMGOPA
          try {
            let imageDataInBase64 = this.base64Image.replace(/^data:image\/jpeg;base64,/, "");
            var self = this;
            await window.imageResizer.resizeImage(
              function(data) {
                 self.imageInfo = `Taille: ${data.width} x ${data.height}`;
                 self.base64Image = "data:image/jpeg;base64," + data.imageData;
              }, function (error) {
                 self.error = error;
              }, imageDataInBase64, 0.5, 0.5, {
                 resizeType: window.ImageResizer.RESIZE_TYPE_FACTOR,
                 imageDataType: window.ImageResizer.IMAGE_DATA_TYPE_BASE64,
                 format: window.ImageResizer.FORMAT_JPG
              }
            );
          }
          catch(e) {
            this.error = e;
          }return this.base64Image;
      }
    );
  }

  async resizePicture() {

    await this.platform.ready();

    try {
      let imageDataInBase64 = this.base64Image.replace(/^data:image\/jpeg;base64,/, "");
      var self = this;
      await window.imageResizer.resizeImage(
        function(data) {
           self.imageInfo = `Taille: ${data.width} x ${data.height}`;
           self.base64Image = "data:image/jpeg;base64," + data.imageData;
        }, function (error) {
           self.error = error;
        }, imageDataInBase64, 0.5, 0.5, {
           resizeType: window.ImageResizer.RESIZE_TYPE_FACTOR,
           imageDataType: window.ImageResizer.IMAGE_DATA_TYPE_BASE64,
           format: window.ImageResizer.FORMAT_JPG
        }
      );
    }
    catch(e) {
      this.error = e;
    }

  }

    submit(){
      let timenow:number = Date.now()
      // let timenow:number = parseInt(time);
      console.log(timenow)
      console.log(this.user._id)
      this.postservice.create({
      creator: {
        name: this.user.name,
        uID: this.user._id,
        avatarSRC: this.user.avatarSRC,
      },
      body: this.body,
      imageSRC: this.base64Image,
      postdate: this.timenow,
      weddingID: "wedding2"
      })
         this.navCtrl.pop();
    }

 }
