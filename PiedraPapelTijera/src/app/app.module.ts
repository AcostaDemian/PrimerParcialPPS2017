import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { About } from '../pages/about/about';
import { Juego } from '../pages/juego/juego';
import { Signup } from '../pages/signup/signup';

import { ModalPage } from '../pages/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import{ ReversePipe } from './reverse';

export const firebaseConfig = {
    apiKey: "AIzaSyBVmTiOsYOMn1xPgKFtTt3ArSidLBmSFmk",
    authDomain: "trivia-e541f.firebaseapp.com",
    databaseURL: "https://trivia-e541f.firebaseio.com",
    projectId: "trivia-e541f",
    storageBucket: "trivia-e541f.appspot.com",
    messagingSenderId: "126131703236"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    About,
    Juego,
    Signup,
    ModalPage,
    ReversePipe   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
    Ng2SmartTableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    About,
    Juego,
    Signup,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
