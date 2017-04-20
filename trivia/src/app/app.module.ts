import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { About } from '../pages/about/about';
import { Trivia } from '../pages/trivia/trivia';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    Trivia
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    About,
    Trivia
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
