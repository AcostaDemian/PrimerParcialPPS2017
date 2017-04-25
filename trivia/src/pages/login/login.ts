import { Component } from '@angular/core';
import { NavController,ViewController, NavParams,ModalController } from 'ionic-angular';

import { AngularFire } from 'angularfire2';
import { HomePage } from '../home/home';

import { ModalPage } from '../modal/modal';
import { Signup } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {  
  persona ={};

  constructor(public navCtrl: NavController,public af: AngularFire,
  public view:ViewController, public modalCtrl: ModalController) {
  }
  
  Login(personaLog){
    this.af.auth.login({ email: personaLog.email, password: personaLog.pass }).then(
      (result) => {
        //console.log(result);
          // all good, lets move on
          this.navCtrl.setRoot(HomePage);
      },
      (err) => {
          // something didn't work
        console.log(err);
      }
    );
    //this.af.auth.subscribe(auth => console.log(auth));    
  }

  abrirRegistro() {
    let myModal = this.modalCtrl.create(Signup);
    myModal.present();
  }
}
