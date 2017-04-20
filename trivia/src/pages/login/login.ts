import { Component } from '@angular/core';
import { NavController,ViewController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {  
  persona ={};

  constructor(public navCtrl: NavController,public af: AngularFire,public view:ViewController) {}

  
  Login(personaLog){
    this.af.auth.login({ email: personaLog.email, password: personaLog.pass }).then(
      (result) => {
          // all good, lets move on
          this.navCtrl.setRoot(HomePage);
      },
      (err) => {
          // something didn't work
        alert(err);
      }
    );
    //this.af.auth.subscribe(auth => console.log(auth));    
  }
}
