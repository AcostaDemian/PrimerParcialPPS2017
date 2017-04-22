import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  persona={};
  private authState: FirebaseAuthState;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public af: AngularFire) {}

  signup(persona){
    this.af.auth.createUser({
        email: persona.email,
        password: persona.pass
      }).then(
        (user) => {
        user.auth.updateProfile({
          displayName: persona.nombre,
          photoURL: ''
        })
        console.log(user);
        this.af.auth.logout();
        this.viewCtrl.dismiss();
      }).catch(
        (err) => {
        console.log(err);
      })
  }

  cancelar(){
    this.viewCtrl.dismiss();
  }


}
