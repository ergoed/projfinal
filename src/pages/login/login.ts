

import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user';

 @IonicPage({
   name:'login',
 })
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;
  public name:string;
  public password:string;
  public error:string;

  private loginForm : FormGroup;
  public type= 'password';
  public showPass = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public auth: AuthProvider,
              private formBuilder: FormBuilder,) {
                this.loginForm = this.formBuilder.group({
                name:[''],
                password:['']
              })
  }

  openSignup(signup){
    let modal = this.modalCtrl.create('SignupPage', { signup : signup });
    modal.present();
  }

  showPassword(){
        this.showPass = !this.showPass;

        if (this.showPass){
            this.type = 'text';
        }
        else {
            this.type = 'password';
        }
    }

    login(){
      this.auth.login({
        name:this.loginForm.value.name,
        password:this.loginForm.value.password}).subscribe(
        res =>{
          console.log('signup res-> ', res)
          // this.close()
        },
        err =>  {
          console.warn('signup err-> ', err)
          this.error = err.statusText
        }
      )
    }

    // close() {
    //   this.viewCtrl.dismiss();
    // }
  //
  // handleError(error: any) {
  //   let message: string =`${error}`;
  //
  //   //What to search to get this error configs
  //
  //   const toast=this.toastCtrl.create({
  //     message,
  //     duration: 5000,
  //     position:'bottom'
  //   });
  //   toast.present();
  // }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

}
