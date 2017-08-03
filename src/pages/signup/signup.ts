import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public name: string;
  public password: string;
  public error: string;

  public type= 'password';
  public showPass = false;
  private signupForm : FormGroup;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public auth: AuthProvider,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {

          this.signupForm = this.formBuilder.group({
            name:[''],
            password:['']
          })
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

  // signup(){
  //   this.navCtrl.setRoot('SubscribePage')
  // }

  signup(){

  console.log('name submited ->',this.signupForm.value.name)
  console.log('password submited ->',this.signupForm.value.password)

    this.auth.signup({
      name:this.signupForm.value.name,
      password:this.signupForm.value.password
    }).subscribe(
      res =>{
        console.log('signup res-> ', res)
        this.successSignupMsg();
      },
      err =>  {
        console.warn('signup err-> ', err)
        this.error = err.statusText
      }
    )
  }
  successSignupMsg() {
      let alert = this.alertCtrl.create({
        title: 'Welcome',
        subTitle: 'Logging',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.close();
            }
          }
          ]
        });
        alert.present();
      }

  close(){
    this.viewCtrl.dismiss();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }

}
