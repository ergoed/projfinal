import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JwtHelper, AuthConfig, AuthHttp } from "angular2-jwt";
import { Storage, IonicStorageModule} from "@ionic/storage";

import { MyApp } from './app.component';
import { Http, HttpModule, RequestOptions } from "@angular/http";
import { PostsService } from '../providers/posts/posts';
import { UsersProvider } from '../providers/users/users';
import { SlicePipe } from '@angular/common';
import { AuthProvider } from '../providers/auth/auth';
import { EndpointsProvider } from '../providers/endpoints/endpoints';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { EnvironmentsModule } from "./environment/environment.module";
import { GuestmessagesProvider } from '../providers/guestmessages/guestmessages';
import { WeddingsProvider } from '../providers/weddings/weddings';


// Auth Factory
export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => { console.log('tokenGetter'); return storage.get('jwt'); }),
  });
  console.log('authHttpServiceFactory');
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    EnvironmentsModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'myappstorage',
      driverOrder: ['localstorage']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PostsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    SlicePipe,
    File,
    Transfer,
    Camera,
    FilePath,
    AuthProvider,
    EndpointsProvider,
    JwtHelper,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    },
    GuestmessagesProvider,
    WeddingsProvider

  ]
})
export class AppModule {}
